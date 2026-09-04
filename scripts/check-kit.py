#!/usr/bin/env python3
"""Maintainer checks for a distributable template; no third-party packages."""
import json
import pathlib
import re
import sys
import tomllib
from urllib.parse import unquote, urlsplit

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP = {".git", "node_modules", ".venv", "__pycache__", "archives"}


def check(root=ROOT):
    root = pathlib.Path(root).resolve()
    errors = []
    kit = json.loads((root / "kit.json").read_text(encoding="utf-8"))
    if kit.get("setup_schema", 0) < 2:
        errors.append("kit.json: missing current setup schema")
    if kit.get("requires_git") is not False or kit.get("requires_scripts") is not False:
        errors.append("kit.json: default setup must work without Git or runtimes")
    if (root / "CLAUDE.md").read_text(encoding="utf-8").strip() != "@AGENTS.md":
        errors.append("CLAUDE.md: expected adapter to root manual")
    skills = sorted((root / ".agents" / "skills").glob("*/SKILL.md"))
    if not skills:
        errors.append("No canonical skills found")
    names = {skill.parent.name for skill in skills}
    for skill in skills:
        name = skill.parent.name
        content = skill.read_text(encoding="utf-8")
        header = re.match(r"\A---\n(.*?)\n---(?:\n|$)", content, re.S)
        if not header:
            errors.append(f"{skill.relative_to(root)}: missing frontmatter")
            continue
        fields = dict(re.findall(r"^(name|description):\s*(.+)$", header[1], re.M))
        if fields.get("name") != name or not fields.get("description"):
            errors.append(f"{name}: invalid skill name or description")
        expected = f".agents/skills/{name}/SKILL.md"
        adapter = root / ".claude" / "skills" / name / "SKILL.md"
        if not adapter.is_file():
            errors.append(f"{name}: missing Claude adapter")
        else:
            body = adapter.read_text(encoding="utf-8")
            if expected not in body or not body.startswith(header[0]):
                errors.append(f"{name}: Claude adapter routing or discovery metadata differs")
        gemini = root / ".gemini" / "commands" / f"{name}.toml"
        try:
            config = tomllib.loads(gemini.read_text(encoding="utf-8"))
            if expected not in config.get("prompt", ""):
                errors.append(f"{name}: Gemini adapter has wrong workflow path")
        except (OSError, tomllib.TOMLDecodeError) as error:
            errors.append(f"{name}: invalid Gemini adapter: {error}")
    for adapter in (root / ".claude" / "skills").glob("*/SKILL.md"):
        if adapter.parent.name not in names:
            errors.append(f"Orphan Claude adapter: {adapter.parent.name}")
    for adapter in (root / ".gemini" / "commands").glob("*.toml"):
        if adapter.stem not in names:
            errors.append(f"Orphan Gemini adapter: {adapter.stem}")
    card = json.loads((root / "company.json").read_text(encoding="utf-8"))
    if any(card.get(key) for key in ("name", "slug", "domain", "repo_url")):
        errors.append("company.json: release template contains personalized identity")
    for document in root.rglob("*.md"):
        if any(part in SKIP for part in document.relative_to(root).parts):
            continue
        content = document.read_text(encoding="utf-8")
        # Examples inside code blocks or inline code are not live links.
        content = re.sub(r"```.*?```", "", content, flags=re.S)
        content = re.sub(r"`[^`\n]*`", "", content)
        for destination in re.findall(r"\[[^\]\n]*\]\(([^)\n]+)\)", content):
            destination = destination.strip().strip("<>")
            parsed = urlsplit(destination)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            target = (document.parent / unquote(parsed.path)).resolve()
            if not target.is_relative_to(root) or not target.exists():
                errors.append(f"{document.relative_to(root)}: broken local link {destination}")
    return errors, len(skills)


if __name__ == "__main__":
    try:
        errors, count = check()
    except (OSError, ValueError) as error:
        print(f"Kit check failed: {error}", file=sys.stderr)
        sys.exit(1)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        sys.exit(1)
    print(f"Kit checks passed: {count} canonical workflows, adapters, metadata, and local links.")
