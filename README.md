# Ataskaitos generavimo API

## Reikalavimai

- Google paskyra su aktyvuotu Google Apps Script API `https://script.google.com/home/usersettings`
- Node and npm
- clasp:

```bash
npm install -g @google/clasp
```

## Instaliacija

Terminale nueikite į projekto aplanką.
Įsirašykite reikalingus paketus:

```sh
npm install
```

Susiekite clasp su savo Google paskyra:

```sh
clasp login
```

Sukurkite skripto projektą. Terminale pasirinkite `webapp`.

```sh
clasp create
```

Sugeneruojamas link'as, kuriuo galima pasiekti skriptą. Šį link'ą galite taip pat gauti su komanda:

```sh
clasp list
```

Įkelkite skriptą į serverį:

```sh
clasp push
```

Jei atsirastų klausimas dėl Manifest failo, spauskite `y` ir `enter`.

Nuėjus į skripto puslapį galite deploy'inti skriptą: `Publish>Deploy as web app...>Update`. Prieš deploy'inimą, būtinai pakeiskite `Who has access to the app` reikšmę į `Anyone, even anonymous`.

Paspaudus `Update` reiks suteikti teises vėl prisijungiant prie Google paskyros. Programą taip pat reiks patvirtinti paspaudus: `Išplėstiniai>Eiti į ... (nesaugu)`. Patvirtinimą reikia pateikti tik vieną kartą. Norint to išvengti reiktų kreiptis į atitinkamus kanalus ir užpildyti programos pateikimo anketą.

Į sugeneruotą URL galite šaudyti POST request'us.

Kodo keitimus galima atlikti su `clasp push` komanda arba tiesiai skripto editoriaus lange. Deploy'inant būtina pasirinkti naujesnę versiją.

Šablono dokumentas bei Google Drive aplankas turi būtinai turėti bent "View" teises.

## POST request pavyzdys

```json
{
  "directory_id": "1VmRZXDqlMU9RLSzJNp_bxMd4Kz7tTsQv",
  "template_id": "1u1cl4pfq0jcSP7nMz3pRWIdHSNEYsqfKVkLzgmWt2yQ",
  "id": "18514",
  "values": {
    "KODAS": "192",
    "PIRKĖJAS": "marius",
    "PARDAVĖJAS": "ignas",
    "METAI": "2015"
  }
}
```

## Konfigūracinis failas

config.ts faile galite pasikeisti šias reikšmes:

`FILE_ACCESS` - sukurto dokumento pasiekiamumas.
Galimų reikšmių aibė: `ANYONE, ANYONE_WITH_LINK, DOMAIN, DOMAIN_WITH_LINK, PRIVATE`.

`FILE_PERMISSION` - sukurto dokumento naudojimo teisės.
Galimų reikšmių aibė: `VIEW, EDIT, COMMENT, OWNER, ORGANIZER, NONE`.

---

Užsakovas: Vilius Aleksejūnas
2020 Deimantas Tumas
