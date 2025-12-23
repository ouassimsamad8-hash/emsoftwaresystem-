# 🌐 Automatic Translation Guide

## ✨ How It Works

Your Strapi CMS now has **automatic AI translation**! When you add content, it automatically translates between English and French.

### 🚀 Usage

1. **Write content in ONE language only**
   - Write in English → Auto-translates to French
   - Write in French → Auto-translates to English

2. **The system detects which language you're using**
   - If you fill `title_en`, it auto-fills `title_fr`
   - If you fill `title_fr`, it auto-fills `title_en`

3. **Works for all content types**
   - ✅ Services
   - ✅ Projects
   - ✅ Blog Posts
   - ✅ FAQs

---

## 📝 Example Workflow

### Creating a New Service:

**Before (Manual):**
```
title_en: "Web Development"
title_fr: "Développement Web"  ← You had to write this manually
shortDescription_en: "Custom web applications..."
shortDescription_fr: "Applications web sur mesure..."  ← Manual
```

**Now (Automatic):**
```
title_en: "Web Development"
title_fr: [AUTO-FILLED] "Développement Web"  ← Translated automatically!
shortDescription_en: "Custom web applications..."
shortDescription_fr: [AUTO-FILLED] "Applications web sur mesure..."  ← Auto!
```

Just write ONE language, save, and both languages are filled!

---

## 🎯 Step-by-Step: Creating Content

### 1. Go to Strapi Admin
```
http://localhost:1337/admin
```

### 2. Go to Content Manager → Create New Entry

For example: **Services** → **Create new entry**

### 3. Fill ONLY English fields (or ONLY French)

**Option A: Write in English**
- `title_en`: "Cloud Migration Services"
- `shortDescription_en`: "Seamless cloud migration for your business"
- Leave `title_fr` and `shortDescription_fr` **EMPTY**

**Option B: Write in French**
- `title_fr`: "Services de Migration Cloud"
- `shortDescription_fr`: "Migration cloud transparente pour votre entreprise"
- Leave `title_en` and `shortDescription_en` **EMPTY**

### 4. Click "Save"

✅ The system automatically fills the other language!

### 5. Check the Console

You'll see:
```
🌐 Auto-translating Service from en...
✅ Translated title_en: "Cloud Migration Services" → "Services de migration cloud"
✅ Translated shortDescription_en: "Seamless cloud..." → "Migration cloud transparente..."
```

---

## 🔧 Configuration

### Basic Usage (FREE)
The system works **out of the box** with Google Translate's free tier.

### Production Usage (Recommended)

For better quality and higher limits:

1. **Get Google Cloud API Key**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Create a project
   - Enable "Cloud Translation API"
   - Create credentials → API Key

2. **Add to Strapi Environment**
   ```bash
   cd strapi-cms
   echo "GOOGLE_TRANSLATE_API_KEY=your-api-key-here" >> .env
   ```

3. **Update Translator**
   The key will be automatically used if present in environment.

---

## 🛠️ Advanced Features

### Override Translations

If you don't like the automatic translation, just edit it manually:

1. Save with auto-translation
2. Edit the entry
3. Change the translated field
4. Save again (it won't overwrite your manual edit)

### Translate Arrays

For fields like `technologies` in Projects, the system automatically translates arrays:

**Input:**
```json
technologies: ["React", "Node.js", "PostgreSQL"]
```

**Output:**
```json
technologies: ["React", "Node.js", "PostgreSQL"]
(Arrays are preserved as technical terms)
```

### Smart Detection

The system automatically detects which language you're writing in:
- If you fill `_en` fields → Translates to `_fr`
- If you fill `_fr` fields → Translates to `_en`
- If you fill both → Keeps both (no translation)

---

## 🎨 Translation Quality

### What Translates Well:
✅ Simple text and descriptions
✅ Marketing content
✅ User interface text
✅ Blog posts and articles
✅ FAQs

### What to Review Manually:
⚠️ Technical jargon
⚠️ Brand names
⚠️ Idiomatic expressions
⚠️ Legal text

**Pro Tip:** Always review the automatic translation before publishing!

---

## 🐛 Troubleshooting

### Translation Not Working?

1. **Check Strapi Console**
   Look for translation logs:
   ```
   🌐 Auto-translating Service from en...
   ✅ Translated title_en: "..." → "..."
   ```

2. **Check Network Connection**
   Translation requires internet access to Google Translate API

3. **Check Field Names**
   Make sure fields end with `_en` or `_fr`:
   - ✅ `title_en`, `title_fr`
   - ❌ `title_english`, `title_french`

4. **Restart Strapi**
   ```bash
   cd strapi-cms
   npm run develop
   ```

### API Rate Limits?

Free tier has limits:
- **500,000 characters/month** (free)
- **Upgrade** for unlimited: https://cloud.google.com/translate/pricing

---

## 📊 Translation Files

All translation logic is in:

```
strapi-cms/
├── src/
│   ├── utils/
│   │   └── translator.ts              ← Core translation logic
│   └── api/
│       ├── service/content-types/service/lifecycles.ts
│       ├── project/content-types/project/lifecycles.ts
│       ├── blog-post/content-types/blog-post/lifecycles.ts
│       └── faq/content-types/faq/lifecycles.ts
```

---

## 🚀 Next Steps

1. ✅ Start Strapi: `cd strapi-cms && npm run develop`
2. ✅ Open admin: http://localhost:1337/admin
3. ✅ Create content in ONE language
4. ✅ Watch it auto-translate! 🎉

---

## 💡 Tips

- **Write in your native language** - Let AI handle the other
- **Review translations** - AI is good but not perfect
- **Edit as needed** - Manual edits won't be overwritten
- **Use consistent terminology** - Helps with translation quality

Happy translating! 🌍✨
