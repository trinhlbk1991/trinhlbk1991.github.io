#!/usr/bin/env python3
"""
Script to identify markdown files missing 'categories' field in their frontmatter.
"""

import os
import yaml
import re
from pathlib import Path

def extract_frontmatter(content):
    """Extract frontmatter from markdown file"""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return parts[1].strip()
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
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False

def get_category_from_path(file_path):
    """Derive category from directory structure"""
    path_parts = str(file_path).split(os.sep)
    
    # Look for directory names that could be categories
    for part in path_parts:
        if part.lower() in ['android', 'ios', 'web', 'til']:
            return [part.lower()]
    
    # If in a subdirectory of blog, use the immediate parent directory
    try:
        # Find blog directory and get its parent
        for i, part in enumerate(path_parts):
            if part == 'blog' and i < len(path_parts) - 1:
                # Return the next directory as category
                next_part = path_parts[i + 1]
                if next_part.lower() in ['android', 'ios', 'web', 'til']:
                    return [next_part.lower()]
                else:
                    return [next_part.lower()]
    except (ValueError, IndexError):
        pass
    
    return ['general']

def main():
    # Define possible target directories
    possible_dirs = [
        Path('new-astro/src/content/blog'),
        Path('_posts'),
        Path('src/content/blog'),
        Path('content/blog'),
        Path('.')
    ]
    
    target_dir = None
    for dir_path in possible_dirs:
        if dir_path.exists():
            target_dir = dir_path
            break
    
    if not target_dir:
        print("Could not find blog directory. Searching from current directory.")
        target_dir = Path('.')
    
    print(f"Searching in: {target_dir.absolute()}")
    
    # Find all markdown files
    md_files = list(target_dir.rglob('*.md'))
    
    print(f"Found {len(md_files)} markdown files")
    
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
    print("=" * 60)
    
    for file_info in files_missing_categories:
        print(f"File: {file_info['path']}")
        print(f"Suggested categories: {file_info['suggested_category']}")
        print("-" * 40)
    
    # Save results to a file
    if files_missing_categories:
        with open('files_missing_categories.txt', 'w') as f:
            f.write("Files missing 'categories' field:\n")
            f.write("=" * 60 + "\n")
            for file_info in files_missing_categories:
                f.write(f"File: {file_info['path']}\n")
                f.write(f"Suggested categories: {file_info['suggested_category']}\n")
                f.write("-" * 40 + "\n")
        print(f"\nResults saved to 'files_missing_categories.txt'")

if __name__ == '__main__':
    main()
