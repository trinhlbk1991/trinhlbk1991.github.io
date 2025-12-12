#!/bin/bash

# Script to add categories: ["android"] to Android blog posts
# This script will search for Android markdown files and add the categories field

# Define the list of Android files
ANDROID_FILES=(
    "2014-06-17-android-activity-slide-transition.md"
    "2014-03-14-android-swipeable-view-with-tab-layout.md"
    "2014-04-02-android-parse-json-android.md"
    "2014-01-28-2d-graphic-in-android.md"
    "2014-02-07-android-custom-list-view.md"
    "2014-03-17-android-android-sliding-menu-using-navigation-drawer.md"
    "2014-01-21-android-custom-dialog.md"
    "2017-07-27-android-rxjava-introduction.md"
    "2014-05-05-create-dynamic-ui-with-fragment.md"
    "2014-06-15-android-activity-fade-transition.md"
    "2014-12-09-android-apply-material-design-pre-lollipop-devices-using-appcompat-v21.md"
    "2020-03-15-android-clean-architecture.md"
    "2014-03-04-android-save-data-to-file.md"
    "2014-10-22-android-simple-request-using-volley.md"
    "2014-01-22-android-fragment.md"
    "2014-01-22-android-custom-toast.md"
    "2015-07-31-property-animation-in-android.md"
    "2014-01-22-android-custom-button.md"
    "2014-05-04-support-multiple-languages-in-android.md"
    "2015-01-02-android-drawer-navigation-menu-material-design-style.md"
    "2021-06-04-hilt-a-standard-way-to-implement-dependency-injection-in-android.md"
    "2014-10-21-android-card-flip-animation.md"
    "2014-11-24-java-basic-regular-expression-java.md"
    "2014-05-08-best-practices-exception-handling.md"
    "2014-11-10-android-apply-mvp-pattern-for-android.md"
    "2014-12-19-android-cardview-and-recyclerview-in-material-design.md"
    "2014-03-02-2d-graphics-using-multi-threading.md"
    "2020-02-24-android-how-to-deal-with-anrs.md"
    "2015-07-19-file-storage-in-android.md"
    "2014-03-18-android-android-action-bar.md"
    "2014-01-22-android-use-existing-sqlite-database-in-android-app.md"
    "2014-11-02-android-parse-json-request-using-volley-gson.md"
    "2020-12-25-android-jetpack-security.md"
    "2014-02-11-listview-dialog.md"
    "2014-05-06-android-use-implicit-intent-call-another-app.md"
    "2015-03-16-android-floating-view-like-facebook-chatheads.md"
    "2014-02-06-tab-layout.md"
    "2014-06-10-android-get-result-from-other-app.md"
    "2016-05-09-android-dependency-injection-using-dagger2.md"
    "2014-03-05-android-notification.md"
    "2016-04-08-android-instrumentation-test-using-espresso.md"
    "2014-01-22-android-custom-radio-button-custom-checkbox.md"
    "2021-08-01-migrate-from-dagger-to-hilt-a-step-by-step-guide.md"
    "2014-10-11-use-dropbox-svn-repository.md"
    "2015-05-15-android-couchbase-lite.md"
    "2014-05-12-design-pattern-singleton-implementation.md"
    "2014-10-07-android-facebook-sdk-integration-android.md"
)

# Function to add categories to a file
add_categories_to_file() {
    local file="$1"
    
    # Check if file exists
    if [[ ! -f "$file" ]]; then
        echo "File not found: $file"
        return 1
    fi
    
    # Check if file already has categories
    if grep -q "^categories:" "$file"; then
        echo "File already has categories: $file"
        return 0
    fi
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file
    in_frontmatter=false
    date_found=false
    categories_added=false
    
    while IFS= read -r line; do
        echo "$line" >> "$temp_file"
        
        # Check for frontmatter start
        if [[ "$line" == "---" ]] && [[ "$in_frontmatter" == false ]]; then
            in_frontmatter=true
        # Check for frontmatter end
        elif [[ "$line" == "---" ]] && [[ "$in_frontmatter" == true ]]; then
            in_frontmatter=false
        # Look for date field in frontmatter
        elif [[ "$in_frontmatter" == true ]] && [[ "$line" =~ ^date: ]] && [[ "$categories_added" == false ]]; then
            echo "categories: [\"android\"]" >> "$temp_file"
            categories_added=true
        fi
    done < "$file"
    
    # Replace the original file with the updated one
    mv "$temp_file" "$file"
    echo "Updated: $file"
}

# Main execution
main() {
    # Define possible base directories
    BASE_DIRS=(
        "new-astro/src/content/blog/android"
        "_posts/android"
        "blog/android"
        "content/blog/android"
        "src/content/blog/android"
        "."
    )
    
    # Find the correct base directory
    BASE_DIR=""
    for dir in "${BASE_DIRS[@]}"; do
        if [[ -d "$dir" ]]; then
            BASE_DIR="$dir"
            echo "Found base directory: $BASE_DIR"
            break
        fi
    done
    
    if [[ -z "$BASE_DIR" ]]; then
        echo "Could not find any of the expected directory structures."
        echo "Please adjust the BASE_DIRS array in the script to match your directory structure."
        return 1
    fi
    
    # Process each file
    processed_count=0
    error_count=0
    
    for filename in "${ANDROID_FILES[@]}"; do
        file_path="$BASE_DIR/$filename"
        if add_categories_to_file "$file_path"; then
            ((processed_count++))
        else
            ((error_count++))
        fi
    done
    
    echo ""
    echo "Processing complete!"
    echo "Files processed: $processed_count"
    echo "Files with errors: $error_count"
}

# Run the main function
main
