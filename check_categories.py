#!/usr/bin/env python3
import os
import yaml
import re
from pathlib import Path

def extract_frontmatter(content):
    """Extract frontmatter from markdown file"""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return parts[1]
    return None

def check_categories_field(file_path):
    """Check if a markdown file has categories field in frontmatter"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        frontmatter = extract_frontmatter(content)
        if not frontmatter:
            return False
            
        # Parse YAML frontmatter
        try:
            data = yaml.safe_load(frontmatter)
            return 'categories' in data if data else False
        except yaml.YAMLError:
            return False
    except Exception:
        return False

def get_category_from_path(file_path):
    """Derive category from directory structure"""
    path_parts = str(file_path).split(os.sep)
    
    # Look for directory names that could be categories
    for part in path_parts:
        if part in ['android', 'ios', 'web', 'til']:
            return [part]
    
    # If in a subdirectory of blog, use the immediate parent directory
    try:
        blog_index = path_parts.index('blog')
        if blog_index < len(path_parts) - 2:  # There's a directory after blog
            return [path_parts[blog_index + 1]]
    except ValueError:
        pass
    
    return ['general']

def main():
    # Define the target directory
    target_dir = Path('new-astro/src/content/blog')
    
    # Check if directory exists
    if not target_dir.exists():
        print(f"Directory {target_dir} does not exist")
        # Try current directory structure
        target_dir = Path('.')
    
    print(f"Searching in: {target_dir.absolute()}")
    
    # Find all markdown files
    md_files = list(target_dir.rglob('*.md'))
    
    if not md_files:
        # Try to find any markdown files in the entire repository
        md_files = list(Path('.').rglob('*.md'))
        print(f"Found {len(md_files)} markdown files in repository")
    else:
        print(f"Found {len(md_files)} markdown files in target directory")
    
    files_missing_categories = []
    
    for md_file in md_files:
        has_categories = check_categories_field(md_file)
        if not has_categories:
            suggested_category = get_category_from_path(md_file)
            files_missing_categories.append({
                'path': str(md_file),
                'suggested_category': suggested_category
            })
    
    print(f"\nFiles missing 'categories' field ({len(files_missing_categories)}):")
    print("-" * 50)
    
    for file_info in files_missing_categories:
        print(f"File: {file_info['path']}")
        print(f"Suggested categories: {file_info['suggested_category']}")
        print()

if __name__ == '__main__':
    main()
