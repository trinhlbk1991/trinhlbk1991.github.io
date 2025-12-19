#!/usr/bin/env python3
"""
Script to migrate external image URLs to local assets in blog posts.
"""
import os
import re
import urllib.request
import urllib.error
from pathlib import Path
from urllib.parse import urlparse
import hashlib
import ssl

# Configuration
BLOG_DIR = "new-astro/src/content/blog"
ASSETS_DIR = "new-astro/public/assets/images"

def find_posts_with_external_images():
    """Find all blog posts that have external image URLs in frontmatter."""
    posts_with_external_images = []
    
    for root, dirs, files in os.walk(BLOG_DIR):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Look for image: "http..." or image: 'http...' in frontmatter
                match = re.search(r'^image:\s*["\']?(https?://[^\s"\']+)["\']?', content, re.MULTILINE)
                if match:
                    image_url = match.group(1)
                    posts_with_external_images.append({
                        'file': filepath,
                        'url': image_url,
                        'category': os.path.basename(os.path.dirname(filepath))
                    })
    
    return posts_with_external_images

def download_image(url, category):
    """Download image from URL and save to local assets."""
    try:
        # Create SSL context that doesn't verify certificates (for this one-time migration)
        ssl_context = ssl._create_unverified_context()
        
        # Create request with headers
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        
        # Get the image
        with urllib.request.urlopen(req, timeout=30, context=ssl_context) as response:
            image_data = response.read()
            
            # Get file extension from URL or content-type
            parsed_url = urlparse(url)
            ext = os.path.splitext(parsed_url.path)[1]
            if not ext or ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
                # Try to guess from content-type
                content_type = response.headers.get('content-type', '')
                if 'jpeg' in content_type or 'jpg' in content_type:
                    ext = '.jpg'
                elif 'png' in content_type:
                    ext = '.png'
                elif 'gif' in content_type:
                    ext = '.gif'
                elif 'webp' in content_type:
                    ext = '.webp'
                else:
                    ext = '.jpg'  # Default
            
            # Create a hash-based filename to avoid conflicts
            url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
            filename = f"{url_hash}{ext}"
            
            # Create category directory if it doesn't exist
            category_dir = os.path.join(ASSETS_DIR, category)
            os.makedirs(category_dir, exist_ok=True)
            
            # Save the image
            local_path = os.path.join(category_dir, filename)
            with open(local_path, 'wb') as f:
                f.write(image_data)
            
            # Return the web path (not filesystem path)
            web_path = f"/assets/images/{category}/{filename}"
            print(f"✓ Downloaded: {url}")
            print(f"  Saved to: {web_path}")
            return web_path
        
    except Exception as e:
        print(f"✗ Failed to download {url}: {e}")
        return None

def update_post_frontmatter(filepath, old_url, new_path):
    """Update the blog post frontmatter to use local image path."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the image URL with local path
    # Handle both quoted and unquoted formats
    patterns = [
        (rf'^image:\s*["\']?{re.escape(old_url)}["\']?', f'image: "{new_path}"'),
        (rf'^image:\s*{re.escape(old_url)}', f'image: "{new_path}"')
    ]
    
    for pattern, replacement in patterns:
        new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Updated: {filepath}")
            return True
    
    print(f"✗ Could not update: {filepath}")
    return False

def main():
    print("🔍 Scanning for blog posts with external images...")
    posts = find_posts_with_external_images()
    
    if not posts:
        print("✓ No posts found with external image URLs!")
        return
    
    print(f"\n📋 Found {len(posts)} post(s) with external images:\n")
    for i, post in enumerate(posts, 1):
        print(f"{i}. {os.path.basename(post['file'])}")
        print(f"   URL: {post['url']}")
        print(f"   Category: {post['category']}\n")
    
    response = input("Do you want to download these images and update the posts? (y/n): ")
    if response.lower() != 'y':
        print("Cancelled.")
        return
    
    print("\n📥 Downloading images and updating posts...\n")
    
    success_count = 0
    fail_count = 0
    
    for post in posts:
        print(f"Processing: {os.path.basename(post['file'])}")
        
        # Download the image
        local_path = download_image(post['url'], post['category'])
        
        if local_path:
            # Update the post
            if update_post_frontmatter(post['file'], post['url'], local_path):
                success_count += 1
            else:
                fail_count += 1
        else:
            fail_count += 1
        
        print()
    
    print(f"\n✅ Complete!")
    print(f"   Successfully migrated: {success_count}")
    print(f"   Failed: {fail_count}")

if __name__ == '__main__':
    main()
