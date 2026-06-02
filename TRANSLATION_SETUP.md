# 🌍 Traduction Multilingue - Guide d'Utilisation

Votre site supporte maintenant **3 langues** : Français, Anglais et Arabe! 

## ✅ Configuration Complétée

### 1. **Installation des dépendances**
- ✅ `i18next` - Moteur de traduction
- ✅ `react-i18next` - Intégration React

### 2. **Structure de fichiers créée**
```
src/
├── i18n.js                 # Configuration i18n
├── locales/
│   ├── fr.json            # Traductions français
│   ├── en.json            # Traductions anglais
│   └── ar.json            # Traductions arabe
├── components/
│   ├── LanguageSwitcher.jsx  # Boutons de sélection de langue
│   ├── Hero.jsx            # ✅ Déjà traduit
│   └── Header.jsx          # ✅ Déjà traduit
└── main.jsx               # ✅ i18n initialisé
```

### 3. **Composants déjà traduits**
- ✅ **Hero.jsx** - Titre, sous-titre, description, boutons CTA
- ✅ **Header.jsx** - Navigation, texte des liens

## 🎯 Comment ajouter les traductions aux autres composants

### Exemple 1 : Gallery.jsx
```jsx
import { useTranslation } from 'react-i18next'

function Gallery() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h2>{t('gallery.title')}</h2>
      <div>{t('gallery.filter')}</div>
    </div>
  )
}
```

### Exemple 2 : Contact.jsx
```jsx
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()
  
  return (
    <form>
      <input placeholder={t('contact.name')} />
      <input placeholder={t('contact.email')} />
      <textarea placeholder={t('contact.message')} />
      <button>{t('contact.send')}</button>
    </form>
  )
}
```

### Exemple 3 : About.jsx
```jsx
import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('about.title')}</h1>
      <p>{t('about.description')}</p>
    </div>
  )
}
```

## 📝 Ajouter de nouvelles clés de traduction

1. **Ouvrir** `src/locales/fr.json`
2. **Ajouter** la nouvelle clé :
```json
{
  "monModule": {
    "maCle": "Mon texte en français"
  }
}
```

3. **Faire la même chose** dans `en.json` et `ar.json`

4. **Utiliser** dans le composant :
```jsx
{t('monModule.maCle')}
```

## 🌐 Comment la sélection de langue fonctionne

Le **LanguageSwitcher** est déjà intégré dans le Header. Les utilisateurs peuvent:
- 🇫🇷 Cliquer sur "Français" pour français
- 🇬🇧 Cliquer sur "English" pour anglais  
- 🇸🇦 Cliquer sur "العربية" pour arabe

**Bonus** : Pour l'arabe, le site passe automatiquement en mode RTL (droite à gauche) ✨

## 💾 Persistance des données

La langue sélectionnée est **sauvegardée dans localStorage**, donc:
- L'utilisateur voit la même langue à chaque visite
- La langue persiste entre les sessions

## 📋 Prochaines étapes recommandées

1. Ajouter les traductions à **Gallery.jsx**, **Contact.jsx**, **About.jsx**
2. Traduire les descriptions des **peintures** (`src/data/paintings.js`)
3. Mettre à jour les **pages** pour utiliser `useTranslation()`

## 🐛 Dépannage

Si une clé de traduction est manquante, le site affichera la clé elle-même (ex: `gallery.title`).

Pour debug, regardez la console du navigateur pour voir les avertissements i18next.

---

✨ **Bon travail !** Votre site est maintenant multilingue! 🌍
