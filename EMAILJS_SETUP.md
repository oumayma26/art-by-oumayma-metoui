# Configuration EmailJS - Guide de Setup

Pour que le formulaire de contact fonctionne, vous devez configurer EmailJS.

## Étapes :

### 1. S'inscrire sur EmailJS
- Allez sur https://www.emailjs.com/
- Créez un compte gratuit

### 2. Configurer un Service d'Email
- Allez dans **Email Services**
- Cliquez sur **Add Service**
- Sélectionnez votre fournisseur (Gmail, Outlook, etc.)
- Authentifiez-vous et confirmez

### 3. Créer un Template d'Email
- Allez dans **Email Templates**
- Cliquez sur **Create New Template**
- Utilisez ce template d'exemple :

```
Subject: Nouveau message de contact - {{subject}}

De: {{from_name}} <{{from_email}}>

Message:
{{message}}
```

**Variables obligatoires:**
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{subject}}` - Sujet du message
- `{{message}}` - Corps du message

### 4. Récupérer vos identifiants
- Allez dans **Account** > **API Keys**
- Copiez votre **Public Key**

- Allez dans **Email Services**
- Copiez votre **Service ID**

- Allez dans **Email Templates**
- Copiez votre **Template ID** (depuis la page du template)

### 5. Mettre à jour le fichier .env.local
Remplacez les valeurs dans `.env.local` :

```env
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_TO_EMAIL=oumayma@example.com
```

### 6. Redémarrer le serveur
```bash
npm run dev
```

## Troubleshooting

- **Erreur "Invalid credentials"** : Vérifiez que vos clés sont correctes
- **Emails non reçus** : Vérifiez que le template ID correspond au bon template
- **CORS Error** : Vous avez peut-être oublié d'initialiser EmailJS

## Notes
- Le plan gratuit d'EmailJS permet 200 emails par mois
- Le fichier `.env.local` ne doit pas être commité (déjà dans .gitignore)
