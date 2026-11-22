KHANDAKAR IKRAMUL ISLAM — PORTFOLIO UPDATE GUIDE
=================================================

This website is static HTML/CSS/JavaScript. There is no backend or database.

IMPORTANT FILES
---------------
index.html          Main portfolio page (upload this)
works.html          All-projects category page (upload this)
projects.js         All project data and links (upload this)
script.js           Homepage behaviour (upload this)
works.js            Category-library behaviour (upload this)
style.css           Design and animation (upload this)
assets/             Put every image and video here (upload this whole folder)
codegenerator.html  Private helper only — DO NOT upload / publish it

WHERE TO PUT PICTURES AND VIDEOS
--------------------------------
1. Landing / opening animation pictures
   Put the 5 opening-scroll pictures in:
     assets/landing/

   Their exact filenames must be:
     pic1.jpg, pic2.jpg, pic3.jpg, pic4.jpg, pic5.jpg

   These are the pictures used in the first full-screen landing animation.
   If you use PNG or WEBP instead, update the matching filenames in
   index.html too. JPG is the simplest option.

2. Large Best Work card gallery on the left of the homepage
   Put every image, direct video file, and optional video-poster image in:
     assets/work/

   Example files:
     assets/work/achievement-1.jpg
     assets/work/achievement-2.png
     assets/work/achievement-video.mp4
     assets/work/achievement-video-poster.jpg

   In codegenerator.html, add one Best Work gallery row for each file. The
   files appear side-by-side in a horizontal scroll gallery inside the large
   LEFT card. Clicking an image or video opens that Best Work's first public
   link. The description and animated SEE MORE button stay on the RIGHT.

   assets/homepage/ is still supported for old project entries, but use
   assets/work/ for all new Best Work gallery files.

3. Cartoon SEE MORE character
   Do not put an image anywhere. The cartoon character and its peek/point
   animation are built into script.js and style.css.

assets/characters/
  Reserved for future character-image assets. It can stay empty.

HOW TO ADD A PROJECT (EASIEST METHOD)
--------------------------------------
1. Open codegenerator.html locally in a browser. It is not linked from the
   portfolio and should not be uploaded with the public site.
2. Fill in work name, category, description, order number and normal project
   link(s). A larger order number appears first in that category.
3. Select "Best Work on homepage? = true" only if it should become that
   category's Best Work item on the main page.
4. When Best Work is true, add one or more gallery image/video/embed rows.
   Recommended path: assets/work/your-file-name.jpg or .mp4
5. Click GENERATE PROJECT CODE. The helper says exactly where to paste it:
   projects.js -> inside projects: [ ], directly below the matching category
   comment (for example: // CASE SOLVING).
6. Save projects.js. If you used local media, copy every file into
   assets/work/ before uploading the website.

BEST WORK TRUE / FALSE RULE
---------------------------
- The code generator now creates `bestWork: true` or `bestWork: false`.
- `true` means that project can be selected for the category's homepage card.
- `false` means it appears only in the category work library.
- If two or more projects are `bestWork: true`, the project with the LARGEST
  `order` number (the newest one) is shown on the homepage. Give every newer
  project a larger order number than the previous one.
- Old project objects that already use `featured: true` continue to work.

BEST WORK GALLERY FORMAT
------------------------
The code generator creates this automatically for Best Work (`bestWork: true`):

  workMedia: [
    { kind: "image", src: "assets/work/achievement-1.jpg", alt: "Award ceremony" },
    { kind: "video", src: "assets/work/achievement-video.mp4", alt: "Project video" }
  ],

kind can be:
- image: normal image file or image URL
- video: direct video file URL / local .mp4 (optional poster field supported)
- embed: an embed-ready YouTube or Vimeo URL

The normal links field stays separate, so the "Open this Best Work" link
and all links on works.html continue to work as before.

CURRENT DESIGN CHANGES
----------------------
- Landing story begins with "Khandakar Ikramul Islam".
- Story text now fades and slides smoothly between frames.
- Every SEE MORE button has a cartoon character that peeks in from outside
  the button and repeatedly points at it.
- The landing animation now uses five images, not ten.
- Experience, capabilities and personality appear immediately after the
  landing animation.
- Each work field is a glassmorphism card. The card nearest the middle of the
  screen pops forward; the fields above and below it soften and blur.
- When the cartoon points, the SEE MORE button also grows slightly.
- On desktop, the large Best Work media gallery appears on the left; the
  description and SEE MORE action appear on the right.
- If a Best Work project has no workMedia/homepageMedia yet, a designed fallback card is
  shown instead of a broken image.

LOCAL TEST
----------
Open index.html directly, or run this command in the project folder:

  python -m http.server 8000

Then visit http://localhost:8000

PUBLISH CHECKLIST
-----------------
Upload index.html, works.html, projects.js, script.js, works.js, style.css,
and the complete assets folder. Do NOT upload codegenerator.html.
