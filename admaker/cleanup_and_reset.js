const fs = require('fs');
const path = require('path');

const topicKeyword = "reviews of ugc video makers with mobile support";
const topicFile = path.join(__dirname, 'data/blog-topics.json');

// 1. Reset Topic
const topics = JSON.parse(fs.readFileSync(topicFile, 'utf8'));
let found = false;
let slug = "";

topics.forEach(t => {
    if (t.keyword.toLowerCase().includes("reviews of ugc video makers") && t.keyword.toLowerCase().includes("mobile support")) {
        console.log(`Resetting topic: ${t.keyword}`);
        t.status = "pending";
        delete t.completedDate;
        delete t.translatedSlugs;
        delete t.translatedTitles;
        delete t.translatedDescriptions;
        slug = t.slug; // Assuming slug might handle the folder name?
        found = true;
    }
});

if (found) {
    fs.writeFileSync(topicFile, JSON.stringify(topics, null, 2));
    console.log("Topic reset.");
}

// 2. Delete Directories
const langs = ['blog', 'fr/blog', 'de/blog', 'es/blog', 'pt/blog'];
// The folder name is currently the English slug.
// We need to delete ANY folder that matches the criteria or just the known one.
// The known one is "reviews-of-ugc-video-makers-with-mobile-support".
const folderName = "reviews-of-ugc-video-makers-with-mobile-support";

langs.forEach(l => {
    const dirPath = path.join(__dirname, 'app', l, folderName);
    if (fs.existsSync(dirPath)) {
        console.log(`Deleting: ${dirPath}`);
        fs.rmSync(dirPath, { recursive: true, force: true });
    } else {
        console.log(`Not found: ${dirPath}`);
    }
});
