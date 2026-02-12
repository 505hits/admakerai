const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data/blog-topics.json');
const topics = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Target keyword (approximate match)
const target = "reviews of ugc video makers with mobile support";

let found = false;
topics.forEach(t => {
    if (t.keyword.toLowerCase().includes("reviews of ugc video makers") && t.keyword.toLowerCase().includes("mobile support")) {
        console.log(`Resetting topic: ${t.keyword}`);
        t.status = "pending";
        delete t.completedDate;
        delete t.translatedSlugs;
        delete t.translatedTitles;
        found = true;
    }
});

if (found) {
    fs.writeFileSync(filePath, JSON.stringify(topics, null, 2));
    console.log("Topic reset successfully.");
} else {
    console.log("Topic not found!");
}
