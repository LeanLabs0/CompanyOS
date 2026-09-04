"""Behavior checks for optional maintenance, using isolated folders."""
import importlib.util
import pathlib
import shutil
import subprocess
import tempfile
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("compose", ROOT / "scripts" / "compose.py")
composer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(composer)


class PointerMaintenanceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = pathlib.Path(self.temp.name)
        (self.root / "memory").mkdir()
        (self.root / "companies").mkdir()
        (self.root / "AGENTS.md").write_text("# Manual\nKeep this instruction.\n", encoding="utf-8")
        (self.root / "memory" / "MEMORY.md").write_text("PRIVATE preference evidence\n", encoding="utf-8")

    def brand(self, slug="acme"):
        folder = self.root / "companies" / slug
        folder.mkdir()
        (folder / "facts.md").write_text("PRIVATE brand facts\n", encoding="utf-8")
        (folder / "flavor.md").write_text("PRIVATE voice evidence\n", encoding="utf-8")
        (self.root / "companies" / ".pinned").write_text(slug, encoding="utf-8")

    def test_plain_folder_preserves_manual_and_does_not_embed_memory(self):
        self.assertFalse((self.root / ".git").exists())
        self.assertTrue(composer.compose(self.root))
        text = (self.root / "AGENTS.md").read_text(encoding="utf-8")
        self.assertIn("Keep this instruction.", text)
        self.assertIn("memory/MEMORY.md", text)
        self.assertNotIn("PRIVATE", text)

    def test_brand_pointer_resolves_without_embedding_private_content(self):
        self.brand()
        composer.compose(self.root)
        text = (self.root / "AGENTS.md").read_text(encoding="utf-8")
        self.assertIn("companies/acme/facts.md", text)
        self.assertIn("companies/acme/flavor.md", text)
        self.assertNotIn("PRIVATE", text)
        self.assertEqual((self.root / "companies/acme/facts.md").read_text(), "PRIVATE brand facts\n")

    def test_repeated_run_does_not_rewrite_unchanged_manual(self):
        composer.compose(self.root)
        manual = self.root / "AGENTS.md"
        before = manual.stat().st_mtime_ns
        self.assertFalse(composer.compose(self.root))
        self.assertEqual(before, manual.stat().st_mtime_ns)

    def test_unpin_removes_previous_brand_pointer(self):
        self.brand()
        composer.compose(self.root)
        (self.root / "companies/.pinned").write_text("", encoding="utf-8")
        composer.compose(self.root)
        self.assertNotIn("companies/acme/", (self.root / "AGENTS.md").read_text())

    def test_invalid_pin_never_changes_manual(self):
        manual = self.root / "AGENTS.md"
        before = manual.read_bytes()
        for slug in ("../outside", "C:/outside", "/outside", "acme/other", "acme\nother"):
            with self.subTest(slug=slug):
                (self.root / "companies/.pinned").write_text(slug, encoding="utf-8")
                with self.assertRaises(ValueError):
                    composer.compose(self.root)
                self.assertEqual(before, manual.read_bytes())

    def test_missing_brand_file_never_changes_manual(self):
        self.brand()
        (self.root / "companies/acme/flavor.md").unlink()
        manual = self.root / "AGENTS.md"
        before = manual.read_bytes()
        with self.assertRaises(ValueError):
            composer.compose(self.root)
        self.assertEqual(before, manual.read_bytes())

    def test_malformed_generated_section_never_changes_manual(self):
        manual = self.root / "AGENTS.md"
        manual.write_text("# Manual\n<!-- BEGIN:MEMORY-INDEX -->\n", encoding="utf-8")
        before = manual.read_bytes()
        with self.assertRaises(ValueError):
            composer.compose(self.root)
        self.assertEqual(before, manual.read_bytes())


class RetiredEntryPointTests(unittest.TestCase):
    def run_retired(self, filename, runtime, arguments=()):
        if not runtime:
            self.skipTest(f"Runtime unavailable for {filename}")
        with tempfile.TemporaryDirectory() as directory:
            folder = pathlib.Path(directory)
            script = folder / filename
            shutil.copy2(ROOT / "scripts" / filename, script)
            (folder / "personal.md").write_text("Keep this client work.\n", encoding="utf-8")
            before = {p.name: p.read_bytes() for p in folder.iterdir()}
            result = subprocess.run(
                [runtime, *arguments, str(script)], cwd=folder,
                capture_output=True, text=True, timeout=15,
            )
            self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("retired", (result.stdout + result.stderr).lower())
            self.assertEqual(before, {p.name: p.read_bytes() for p in folder.iterdir()})

    def test_identity_stamp_stops_without_mutation(self):
        self.run_retired("apply-company.mjs", shutil.which("node"))

    def test_windows_sync_stops_without_mutation(self):
        self.run_retired("sync.ps1", shutil.which("pwsh") or shutil.which("powershell"), ("-NoProfile", "-File"))

    def test_windows_schedule_setup_stops_without_mutation(self):
        self.run_retired("setup-sync-task.ps1", shutil.which("pwsh") or shutil.which("powershell"), ("-NoProfile", "-File"))

    def bash(self):
        git_bash = pathlib.Path("C:/Program Files/Git/bin/bash.exe")
        return str(git_bash) if git_bash.exists() else shutil.which("bash")

    def test_shell_sync_stops_without_mutation(self):
        self.run_retired("sync.sh", self.bash())

    def test_shell_upgrade_stops_without_mutation(self):
        self.run_retired("update-from-upstream.sh", self.bash())


if __name__ == "__main__":
    unittest.main()
