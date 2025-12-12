#!/usr/bin/env python3
"""
Complete solution to identify markdown files missing 'categories' field in their frontmatter.
This script will search for blog posts and check their frontmatter for the required categories field.
"""

import os
import yaml
import re
from pathlib import Path

def extract_frontmatter(content):
    """Extract frontmatter from markdown file"""
    # Handle different frontmatter formats
    if content.strip().startswith('---'):
        lines = content.strip().split('\n')
        if len(lines) < 2:
            return None
        
        # Find the end of frontmatter
        frontmatter_lines = []
        for i, line in enumerate(lines[1:], 1):  # Skip first ---
            if line.strip() == '---':
                break
            frontmatter_lines.append(line)
        
        return '\n'.join(frontmatter_lines)
    return None

def check_categories_field(file_path):
    """Check if a markdown file has categories field in frontmatter"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        frontmatter = extract_frontmatter(content)
        if not frontmatter:
            return False  # No frontmatter found
            
        # Parse YAML frontmatter
        try:
            data = yaml.safe_load(frontmatter)
            return 'categories' in (data or {})  # Check if categories key exists
        except yaml.YAMLError as e:
            print(f"YAML parsing error in {file_path}: {e}")
            return False
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False

def get_category_from_path(file_path):
    """Derive category from directory structure"""
    path_str = str(file_path).lower()
    path_parts = path_str.split(os.sep)
    
    # Look for common category directory names
    common_categories = ['android', 'ios', 'web', 'til', 'tech', 'programming']
    for category in common_categories:
        if category in path_parts:
            return [category]
    
    # Check for directory structure patterns
    # Pattern: .../category/filename.md
    if len(path_parts) >= 2:
        parent_dir = path_parts[-2]  # Directory containing the file
        if parent_dir in common_categories or len(parent_dir) > 1:
            return [parent_dir]
    
    # Default fallback
    return ['general']

def find_blog_directories(start_path):
    """Find potential blog directories"""
    blog_dirs = []
    start_path = Path(start_path)
    
    # Common blog directory patterns
    patterns = [
        'new-astro/src/content/blog',
        'src/content/blog',
        'content/blog',
        '_posts',
        'blog'
    ]
    
    # Check for exact matches first
    for pattern in patterns:
        full_path = start_path / pattern
        if full_path.exists():
            blog_dirs.append(full_path)
    
    # If no exact matches, search for directories with these names
    if not blog_dirs:
        for root, dirs, files in os.walk(start_path):
            for dir_name in dirs:
                if dir_name in ['blog', 'posts', '_posts'] or 'blog' in dir_name:
                    blog_dirs.append(Path(root) / dir_name)
    
    # Fallback to current directory if nothing found
    if not blog_dirs:
        blog_dirs.append(start_path)
    
    return blog_dirs

def process_markdown_files(blog_dirs):
    """Process all markdown files in blog directories"""
    all_files = []
    processed_paths = set()
    
    for blog_dir in blog_dirs:
        if not blog_dir.exists():
            continue
            
        print(f"Searching in: {blog_dir}")
        
        # Find all markdown files
        md_files = list(blog_dir.rglob('*.md'))
        print(f"Found {len(md_files)} markdown files in {blog_dir}")
        
        for md_file in md_files:
            # Avoid processing the same file multiple times
            abs_path = md_file.resolve()
            if abs_path in processed_paths:
                continue
            processed_paths.add(abs_path)
            
            all_files.append(md_file)
    
    return all_files

def main():
    # Get current working directory
    current_dir = Path.cwd()
    print(f"Current directory: {current_dir}")
    
    # Find blog directories
    blog_dirs = find_blog_directories(current_dir)
    print(f"Found {len(blog_dirs)} potential blog directories")
    
    # Process markdown files
    all_md_files = process_markdown_files(blog_dirs)
    print(f"Processing {len(all_md_files)} unique markdown files")
    
    # Check each file for categories field
    files_missing_categories = []
    
    for md_file in all_md_files:
        has_categories = check_categories_field(md_file)
        if not has_categories:
            suggested_category = get_category_from_path(md_file)
            files_missing_categories.append({
                'path': str(md_file.relative_to(current_dir)),
                'absolute_path': str(md_file),
                'suggested_category': suggested_category
            })
    
    # Display results
    print(f"\n{'='*80}")
    print(f"FILES MISSING 'CATEGORIES' FIELD ({len(files_missing_categories)})")
    print(f"{'='*80}")
    
    if not files_missing_categories:
        print("All files have the 'categories' field!")
        return
    
    # Group by suggested category for better organization
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
    
    # Save detailed results to file
    save_detailed_results(files_missing_categories)
    
    # Show summary
    print(f"\n{'='*80}")
    print("SUMMARY")
    print(f"{'='*80}")
    print(f"Total markdown files checked: {len(all_md_files)}")
    print(f"Files missing 'categories' field: {len(files_missing_categories)}")
    print(f"Detailed results saved to 'missing_categories_report.txt'")
    
    # Show example fix
    if files_missing_categories:
        print(f"\n💡 Example fix for '{files_missing_categories[0]['path']}':")
        print("   Add this to your frontmatter:")
        category_example = files_missing_categories[0]['suggested_category']
        print(f"   ---")
        print(f"   title: Your Title")
        print(f"   date: YYYY-MM-DD")
        print(f"   categories: {category_example}")
        print(f"   ---")

def save_detailed_results(files_missing_categories):
    """Save detailed results to a text file"""
    with open('missing_categories_report.txt', 'w', encoding='utf-8') as f:
        f.write("FILES MISSING 'CATEGORIES' FIELD REPORT\n")
        f.write("="*50 + "\n\n")
        
        f.write(f"Total files missing categories: {len(files_missing_categories)}\n\n")
        
        # Group by suggested category
        categorized_results = {}
        for file_info in files_missing_categories:
            category = file_info['suggested_category'][0]
            if category not in categorized_results:
                categorized_results[category] = []
            categorized_results[category].append(file_info)
        
        # Write organized results
        for category, files in categorized_results.items():
            f.write(f"\n📁 Category: {category} ({len(files)} files)\n")
            f.write("-"*40 + "\n")
            for file_info in files:
                f.write(f"  • {file_info['path']}\n")
                f.write(f"    Suggested: categories: {file_info['suggested_category']}\n")
                f.write(f"    Full path: {file_info['absolute_path']}\n\n")

if __name__ == '__main__':
    main()
