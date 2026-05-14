# NGO Website Batch Gallery

CSV-driven React + Vite + Tailwind generator for premium NGO landing pages. The app reads client rows from `public/data/ngo_clients.csv`, shows a batch gallery on the home route, and renders each NGO website from the same polished template.

## How It Works

- `#/` shows the NGO Website Batch Gallery.
- `#/{slug}` opens a generated NGO website, for example `#/hopeforward`.
- Only rows with `status` set to `live` or `ready` are shown.
- The `batch` column can group clients as `batch 1`, `batch 2`, and so on.
- Missing text, image, and color values fall back to safe defaults so pages do not crash.

## CSV File

Edit:

```bash
public/data/ngo_clients.csv
```

Required columns:

```csv
slug,ngo_name,tagline,location,established_year,hero_headline,hero_highlight,hero_subheadline,mission_text,donation_cta,primary_color,secondary_color,accent_color,hero_image_url,logo_url,program_1_title,program_1_category,program_1_description,program_1_image_url,program_2_title,program_2_category,program_2_description,program_2_image_url,program_3_title,program_3_category,program_3_description,program_3_image_url,program_4_title,program_4_category,program_4_description,program_4_image_url,impact_1_number,impact_1_label,impact_1_subtext,impact_2_number,impact_2_label,impact_2_subtext,impact_3_number,impact_3_label,impact_3_subtext,impact_4_number,impact_4_label,impact_4_subtext,testimonial_quote,testimonial_name,testimonial_location,team_1_name,team_1_role,team_1_bio,team_2_name,team_2_role,team_2_bio,team_3_name,team_3_role,team_3_bio,email,phone,address,donate_link,contact_link,batch,status
```

To add a new NGO/client, add one row with a unique `slug`. Set `status` to `ready` or `live` when it should appear in the gallery and be published.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is configured for GitHub Pages at:

```txt
https://github.com/guddukumaralgo-art/client-ngo-site
```

Vite uses:

```js
base: '/client-ngo-site/'
```

Push to `main` and GitHub Actions will build the app and deploy the `dist` folder to GitHub Pages.
