#!/usr/bin/env python3
"""
Script to check blog post files for missing 'categories' field in frontmatter.
Works with Jekyll blogs using the Chirpy theme.
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
            return 'categories' in (data or {})
        except yaml.YAMLError:
            return False
    except Exception:
        return False

def get_category_from_path(file_path):
    """Derive category from directory structure or filename"""
    path_str = str(file_path).lower()
    path_parts = path_str.split(os.sep)
    
    # Common category names
    common_categories = ['android', 'ios', 'web', 'til', 'tech', 'programming']
    
    # Check path parts for category names
    for part in path_parts:
        if part in common_categories:
            return [part]
    
    # Check parent directory name
    if len(path_parts) >= 2:
        parent_dir = path_parts[-2]
        if parent_dir in common_categories:
            return [parent_dir]
    
    # Default category
    return ['general']

def find_blog_posts():
    """Find blog post files in typical Jekyll structure"""
    possible_dirs = [
        '_posts',
        'new-astro/src/content/blog',
        'src/content/blog',
        'content/blog',
        '.'
    ]
    
    blog_files = []
    
    for dir_name in possible_dirs:
        dir_path = Path(dir_name)
        if dir_path.exists():
            # Find markdown files
            md_files = list(dir_path.rglob('*.md'))
            blog_files.extend(md_files)
            print(f"Found {len(md_files)} markdown files in {dir_name}")
    
    return blog_files

def main():
    print("Checking blog posts for missing 'categories' field...")
    
    # Find blog post files
    blog_files = find_blog_posts()
    
    if not blog_files:
        print("No blog post files found. Checking entire directory...")
        blog_files = list(Path('.').rglob('*.md'))
    
    print(f"Total markdown files found: {len(blog_files)}")
    
    # Check each file for categories field
    files_missing_categories = []
    
    for file_path in blog_files:
        has_categories = check_categories_field(file_path)
        if not has_categories:
            suggested_category = get_category_from_path(file_path)
            files_missing_categories.append({
                'path': str(file_path),
                'suggested_category': suggested_category
            })
    
    # Display results
    print(f"\n{'='*60}")
    print(f"FILES MISSING 'CATEGORIES' FIELD ({len(files_missing_categories)})")
    print(f"{'='*60}")
    
    if not files_missing_categories:
        print("All files have the 'categories' field!")
        return
    
    # Group by suggested category
    categorized_results = {}
    for file_info in files_missing_categories:
        category = file_info['suggested_category'][0]
        if category not in categorized_results:
            categorized_results[category] = []
        categorized_results[category].append(file_info)
    
    # Display organized results
    for category, files in categorized_results.items():
        print(f"\n📁 Category: {category} ({len(files)} files)")
        print("-" * 40)
        for file_info in files:
            print(f"  • {file_info['path']}")
    
    # Save results to file
    if files_missing_categories:
        with open('missing_categories_report.txt', 'w') as f:
            f.write("Files missing 'categories' field:\n")
            f.write("=" * 50 + "\n\n")
            for category, files in categorized_results.items():
                f.write(f"Category: {category} ({len(files)} files)\n")
                f.write("-" * 30 + "\n")
                for file_info in files:
                    f.write(f"  • {file_info['path']}\n")
                f.write("\n")
        
        print(f"\nDetailed report saved to 'missing_categories_report.txt'")
        
        # Show example fix
        print(f"\n💡 Example fix for '{files_missing_categories[0]['path']}':")
        print("Add this to your frontmatter:")
        category_example = files_missing_categories[0]['suggested_category']
        print("   ---")
        print("   title: Your Post Title")
        print("   date: YYYY-MM-DD")
        print(f"   categories: {category_example}")
        print("   ---")

if __name__ == '__main__':
    main()
