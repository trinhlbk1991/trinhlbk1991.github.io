#!/usr/bin/env python3
"""
Script to add categories: ["android"] to Android blog posts
"""

import os
import re
from pathlib import Path

# List of files that need fixing
android_files = [
    "2014-06-17-android-activity-slide-transition.md",
    "2014-03-14-android-swipeable-view-with-tab-layout.md",
    "2014-04-02-android-parse-json-android.md",
    "2014-01-28-2d-graphic-in-android.md",
    "2014-02-07-android-custom-list-view.md",
    "2014-03-17-android-android-sliding-menu-using-navigation-drawer.md",
    "2014-01-21-android-custom-dialog.md",
    "2017-07-27-android-rxjava-introduction.md",
    "2014-05-05-create-dynamic-ui-with-fragment.md",
    "2014-06-15-android-activity-fade-transition.md",
    "2014-12-09-android-apply-material-design-pre-lollipop-devices-using-appcompat-v21.md",
    "2020-03-15-android-clean-architecture.md",
    "2014-03-04-android-save-data-to-file.md",
    "2014-10-22-android-simple-request-using-volley.md",
    "2014-01-22-android-fragment.md",
    "2014-01-22-android-custom-toast.md",
    "2015-07-31-property-animation-in-android.md",
    "2014-01-22-android-custom-button.md",
    "2014-05-04-support-multiple-languages-in-android.md",
    "2015-01-02-android-drawer-navigation-menu-material-design-style.md",
    "2021-06-04-hilt-a-standard-way-to-implement-dependency-injection-in-android.md",
    "2014-10-21-android-card-flip-animation.md",
    "2014-11-24-java-basic-regular-expression-java.md",
    "2014-05-08-best-practices-exception-handling.md",
    "2014-11-10-android-apply-mvp-pattern-for-android.md",
    "2014-12-19-android-cardview-and-recyclerview-in-material-design.md",
    "2014-03-02-2d-graphics-using-multi-threading.md",
    "2020-02-24-android-how-to-deal-with-anrs.md",
    "2015-07-19-file-storage-in-android.md",
    "2014-03-18-android-android-action-bar.md",
    "2014-01-22-android-use-existing-sqlite-database-in-android-app.md",
    "2014-11-02-android-parse-json-request-using-volley-gson.md",
    "2020-12-25-android-jetpack-security.md",
    "2014-02-11-listview-dialog.md",
    "2014-05-06-android-use-implicit-intent-call-another-app.md",
    "2015-03-16-android-floating-view-like-facebook-chatheads.md",
    "2014-02-06-tab-layout.md",
    "2014-06-10-android-get-result-from-other-app.md",
    "2016-05-09-android-dependency-injection-using-dagger2.md",
    "2014-03-05-android-notification.md",
    "2016-04-08-android-instrumentation-test-using-espresso.md",
    "2014-01-22-android-custom-radio-button-custom-checkbox.md",
    "2021-08-01-migrate-from-dagger-to-hilt-a-step-by-step-guide.md",
    "2014-10-11-use-dropbox-svn-repository.md",
    "2015-05-15-android-couchbase-lite.md",
    "2014-05-12-design-pattern-singleton-implementation.md",
    "2014-10-07-android-facebook-sdk-integration-android.md"
]

def add_category_to_file(file_path):
    """
    Add categories: ["android"] to the frontmatter of a file
    """
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
    
    # Read the file content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file already has categories
    if re.search(r'^categories:', content, re.MULTILINE):
        print(f"File already has categories: {file_path}")
        return True
    
    # Find the date field in the frontmatter
    # Look for date field and insert categories after it
    lines = content.split('\n')
    new_lines = []
    date_found = False
    categories_added = False
    
    for line in lines:
        new_lines.append(line)
        
        # Look for date field (not indented, at frontmatter level)
        if re.match(r'^date:.*', line) and not categories_added:
            date_found = True
            # Add categories field right after date
            new_lines.append('categories: ["android"]')
            categories_added = True
        
        # If we reach the end of frontmatter without finding date, add before closing ---
        if line.strip() == '---' and len(new_lines) > 1 and date_found and not categories_added:
            # Insert categories before the closing ---
            new_lines.insert(-1, 'categories: ["android"]')
            categories_added = True
    
    # If we didn't find a date field, add categories before the closing ---
    if not date_found and not categories_added:
        for i in range(len(new_lines)-1, -1, -1):
            if new_lines[i].strip() == '---':
                new_lines.insert(i, 'categories: ["android"]')
                categories_added = True
                break
    
    # Write the updated content back to the file
    updated_content = '\n'.join(new_lines)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"Updated: {file_path}")
    return True

def main():
    # Base directory - adjust this to match your actual directory structure
    base_dir = "new-astro/src/content/blog/android"
    
    # Try alternative paths if the above doesn't work
    alternative_paths = [
        "_posts/android",
        "blog/android",
        "content/blog/android",
        "src/content/blog/android"
    ]
    
    # Check if base directory exists
    if not os.path.exists(base_dir):
        print(f"Base directory not found: {base_dir}")
        # Try alternative paths
        for alt_path in alternative_paths:
            if os.path.exists(alt_path):
                base_dir = alt_path
                print(f"Using alternative path: {base_dir}")
                break
        else:
            print("Could not find any of the expected directory structures.")
            print("Please adjust the base_dir variable in the script to match your directory structure.")
            return
    
    # Process each file
    processed_count = 0
    error_count = 0
    
    for filename in android_files:
        file_path = os.path.join(base_dir, filename)
        try:
            if add_category_to_file(file_path):
                processed_count += 1
            else:
                error_count += 1
        except Exception as e:
            print(f"Error processing {filename}: {str(e)}")
            error_count += 1
    
    print(f"\nProcessing complete!")
    print(f"Files processed: {processed_count}")
    print(f"Files with errors: {error_count}")

if __name__ == "__main__":
    main()
