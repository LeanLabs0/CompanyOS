#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const EXT = new Set([".md",".mdc",".txt",".json",".yml",".yaml",".sh",".ps1"]);
const SKIP = new Set(["company.json","company.example.json","package.json","package-lock.json","apply-company.mjs"]);
const SKIPDIR = new Set([".git","node_modules",".venv","__pycache__",".idea",".vscode"]);
function die(m){console.error("ERROR: "+m);process.exit(1)}
function load(){
  const p=path.join(ROOT,"company.json");
  if(!fs.existsSync(p)) die("Missing company.json");
  let c; try{c=JSON.parse(fs.readFileSync(p,"utf8"))}catch(e){die(e.message)}
  const miss=["name","slug","short_name"].filter(k=>!c[k]||!String(c[k]).trim());
  if(miss.length) die("company.json missing required fields: "+miss.join(", ")+" (see company.example.json)");
  return c;
}
function reps(c){
  return [["{{company.name}}",c.name],["{{company.slug}}",c.slug],["{{company.domain}}",c.domain||""],["{{company.short_name}}",c.short_name],["{{company.founder_or_voice}}",c.founder_or_voice||""],["{{repo_url}}",c.repo_url||""]].sort((a,b)=>b[0].length-a[0].length);
}
function walk(d,o=[]){
  for(const ent of fs.readdirSync(d,{withFileTypes:true})){
    if(SKIPDIR.has(ent.name)) continue;
    const f=path.join(d,ent.name);
    if(ent.isDirectory()) walk(f,o); else if(ent.isFile()) o.push(f);
  }
  return o;
}
function apply(s,r){let n=s,h=0; for(const [a,b] of r){ if(!a||!n.includes(a)) continue; const p=n.split(a); h+=p.length-1; n=p.join(b);} return {n,h};}
function renamePlaceholder(kind, slug, dry){
  const a=path.join(ROOT,kind,"company"); const b=path.join(ROOT,kind,slug); const acts=[];
  if(!fs.existsSync(a)){acts.push(kind+"/company/ not present - skip rename"); return acts;}
  if(fs.existsSync(b)){acts.push(kind+"/"+slug+"/ already exists - leave company/"); return acts;}
  acts.push("rename "+kind+"/company/ -> "+kind+"/"+slug+"/");
  if(!dry) fs.renameSync(a,b); return acts;
}
const company=load(); const r=reps(company);
console.log(DRY?"=== DRY RUN ===":"=== APPLY COMPANY ===");
console.log("Company: "+company.name+" ("+company.slug+")");
console.log("Root: "+ROOT);
const changed=[]; let total=0;
for(const full of walk(ROOT)){
  const base=path.basename(full); if(SKIP.has(base)) continue;
  if(!EXT.has(path.extname(base).toLowerCase())) continue;
  let content; try{content=fs.readFileSync(full,"utf8")}catch{continue}
  const {n,h}=apply(content,r);
  if(h>0 && n!==content){ changed.push([path.relative(ROOT,full),h]); total+=h; if(!DRY) fs.writeFileSync(full,n,"utf8"); }
}
const ra=[...renamePlaceholder("facts-wiki",company.slug,DRY), ...renamePlaceholder("companies",company.slug,DRY)];
if(!DRY){ company.bootstrapped_at=new Date().toISOString(); fs.writeFileSync(path.join(ROOT,"company.json"), JSON.stringify(company,null,2)+"\n","utf8"); console.log("\nSet bootstrapped_at = "+company.bootstrapped_at); }
else console.log("\nWould set bootstrapped_at to ISO timestamp");
console.log("\nFiles changed: "+changed.length+" ("+total+" replacements)");
for(const [rel,h] of changed.sort((x,y)=>x[0].localeCompare(y[0]))) console.log("  "+rel+" ("+h+")");
console.log("\nFolder rename:"); for(const x of ra) console.log("  "+x);
console.log(DRY?"\nDry run complete.":"\nDone.");
console.log("Note: Ralph skills live in .agents/skills/ (and .claude mirrors). compose.py needs Python; this script is the Node identity stamp.");