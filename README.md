# মাইনুল ইসলাম আলিফ — পোর্টফোলিও

বাংলা ভাষার ব্যক্তিগত পরিচিতি ও সৃষ্টিকর্মের ক্যাটালগ। প্রকল্পটি Next.js App Router, React, TypeScript, Tailwind CSS এবং `db.json`-ভিত্তিক প্রাথমিক কনটেন্ট ব্যবহার করে।

## চালানো

Node.js ইনস্টল করে প্রকল্পের মূল ফোল্ডারে চালান:

```powershell
npm install
npm run dev
```

স্থানীয় সাইট সাধারণত `http://localhost:3000`-এ চলবে। অন্যান্য কমান্ড:

| কমান্ড | কাজ |
| --- | --- |
| `npm run lint` | ESLint চালায় |
| `npx tsc --noEmit` | TypeScript যাচাই করে |
| `npm run build` | প্রোডাকশন বিল্ড তৈরি করে |
| `npm run start` | প্রোডাকশন বিল্ড চালায় |

## সাইটের URL ও SEO

প্রোডাকশনে ডিপ্লয় করার আগে প্রকৃত সাইটের origin দিয়ে `SITE_URL` সেট করুন, যেমন:

```env
SITE_URL=https://your-verified-domain.example
```

এটি `.env.local`-এ স্থানীয়ভাবে বা ডিপ্লয়মেন্ট প্ল্যাটফর্মের environment settings-এ যোগ করুন। ডোমেইন ও protocol প্রকৃত হওয়া নিশ্চিত করুন, তারপর প্রোডাকশন বিল্ড তৈরি করুন। এই মান থেকে canonical URL, Open Graph origin এবং sitemap তৈরি হয়। `SITE_URL` না থাকলে ভুল বা অনুমানভিত্তিক domain প্রকাশ না করতে sitemap ফাঁকা থাকে এবং canonical URL তৈরি হয় না।

## কনটেন্ট সম্পাদনা

- `db.json` প্রাথমিক editable content source। সাইটের তথ্য, profile, category এবং creation এখানে রক্ষণাবেক্ষণ করুন।
- সৃষ্টিকর্মের `status` `draft`, `published` অথবা `archived` হতে পারে। যাচাইকৃত নয় এমন নমুনা `draft` রাখুন; প্রকাশিত পাতায়, সার্চ-সম্পর্কিত metadata ও sitemap-এ কেবল `published` কাজ অন্তর্ভুক্ত হয়।
- Creation-এর `categoryId` অবশ্যই বিদ্যমান category ID হতে হবে; ID ও slug অনন্য রাখুন।
- যোগাযোগের ইমেইল, ফোন, ঠিকানা, availability ও সামাজিক URL `site`-এর অধীনে সম্পাদনা করুন। ফাঁকা বা অবৈধ যোগাযোগ URL স্বয়ংক্রিয়ভাবে লিংক হিসেবে দেখানো হয় না।
- `public/`-এ image যোগ করুন এবং `db.json`-এর image path-এ `/images/...`-এর মতো public URL ব্যবহার করুন। অনুপস্থিত image-এর জন্য UI fallback রয়েছে।

## Route map

| Route | বিষয় |
| --- | --- |
| `/` | পরিচিতি, সৃষ্টিকর্মের বিভাগ ও যোগাযোগ CTA |
| `/about` | প্রোফাইল ও পটভূমি |
| `/creations` | সৃষ্টিকর্মের বিভাগ |
| `/creations/[category]` | একটি বিভাগের প্রকাশিত কাজ |
| `/creations/[category]/[slug]` | প্রকাশিত কাজের বিস্তারিত |
| `/contact` | যোগাযোগের তথ্য ও প্রদর্শনী ফর্ম |
| `/privacy` | প্রদর্শনী ফর্মের তথ্য ব্যবহারের বিবরণ |
| `/robots.txt`, `/sitemap.xml` | crawler নির্দেশনা ও sitemap |

## বর্তমান সীমাবদ্ধতা

- Seed creation-গুলো draft থাকলে সৃষ্টিকর্মের তালিকা ও বিভাগে খালি অবস্থার বার্তা দেখা যায়।
- যোগাযোগ ফর্মটি শুধু browser-এ input যাচাই করে; এটি বার্তা পাঠায় বা সংরক্ষণ করে না। কার্যকর submission-এর আগে backend/email integration ও সংশ্লিষ্ট গোপনীয়তা বিবরণ যোগ করতে হবে।
- কেনাকাটা, পেমেন্ট ও সুরক্ষিত download এখনো সংযুক্ত নয়; কোনো private file URL public কনটেন্টে রাখা যাবে না।
- প্রোফাইলের placeholder তথ্য যাচাই করে প্রতিস্থাপন করতে হবে; যাচাই না হওয়া তথ্যকে বাস্তব জীবনী হিসেবে প্রকাশ করবেন না।