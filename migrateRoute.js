import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace strict Link import
  content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";');
  
  // Replace combined Link and useParams
  content = content.replace(/import\s*\{\s*Link\s*,\s*useParams\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useParams } from "next/navigation";');
  content = content.replace(/import\s*\{\s*useParams\s*,\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useParams } from "next/navigation";');
  
  // Replace combined Link, useParams, Navigate
  content = content.replace(/import\s*\{\s*Link\s*,\s*useParams\s*,\s*Navigate\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useParams, redirect as Navigate } from "next/navigation";');
  
  // Replace just useParams
  content = content.replace(/import\s*\{\s*useParams\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import { useParams } from "next/navigation";');

  // Replace just useLocation
  content = content.replace(/import\s*\{\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import { usePathname } from "next/navigation";');
  content = content.replace(/useLocation\(\)/g, 'usePathname()');
  content = content.replace(/location\.pathname/g, 'pathname');

  // Replace react-helmet-async with standard Next.js Head or just removal if it's unused later
  content = content.replace(/import\s*\{\s*Helmet\s*\}\s*from\s*['"]react-helmet-async['"];?/g, 'import Head from "next/head";');
  content = content.replace(/<Helmet>/g, '<Head>');
  content = content.replace(/<\/Helmet>/g, '</Head>');

  // Replace `<Link to=`
  content = content.replace(/<Link\s+to=\{/g, '<Link href={');
  content = content.replace(/<Link\s+to="/g, '<Link href="');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', filePath);
  }
}

walkDir('./src/pages', processFile);
walkDir('./src/components', processFile);
