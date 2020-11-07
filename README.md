# WebDocX

![Layout](https://i.ibb.co/C9mx2Vr/layout-jpg.jpg)

**Live Demo:** [WebDocX](https://web-doc-x.herokuapp.com/)

While the outset of the crisis was subtle, the COVID-19 pandemic spread like wildfire, engulfing the entire medical sector. Social distancing measures stimulated a drastic change in medical consultation across the globe. With heightened public concerns, most patients remain wary of visiting hospitals for any medical consultation. 

Coronavirus is not the only ailment that citizens are having right now. All other diseases still exist and access to hospitals and doctors are extremely constrained. In light of the current events, it is vital to have necessary technological solutions in place for doctors to keep serving the patients during these grueling  times. 

### Features

- **Patients:** Patients can view the profiles of doctors and using professional background information, decide whether or not to seek consultation. They can send in consultation request to a specific doctor. Alternatively, they can post their problem which the doctors can view and accept. 

- **Doctors:** Doctors can register and fill in the necessary professional details required by our team to verify the authenticity of the account. Once verified, doctors can attend to patient consultation requests and accept them if it falls in their scope.

- **Consultations:** Consultation chat rooms are established for patients who have connected with the doctor to communicate in real-time through digital messaging.

- **Prescriptions:** At the end of each consultation, doctors are prompted to fill in details for prescription generation for the patient which will be digitally signed by the doctor.

### Environment Variables

In the .env file you have to set the following environment variables::

- **MONGODB_URI**, insert your locally/ web hosted MongoDB database URI

- **SECRET_KEY**, a secret key used to hash the session with HMAC

- **MAIL_USERNAME**, the backend uses Gmail to send mails

- **MAIL_USERNAME**, the backend uses Gmail to send mails

- **CLIENT_ID, CLIENT_SECRET and REFRESH_TOKEN**, token for gmail OAuth

### Local Setup

Make sure you have **NodeJS** v10 or greater installed:
``` bash
node -v
```

Clone the project:
``` bash
git clone https://github.com/Faraz710/WebDocX.git
```

Install package dependencies using `npm` or `yarn`:
``` bash
npm install
```
or
``` bash
yarn install
```

The application will setup on port `3000`.

Feel free to send pull requests if you wish to contribute to the website.

## Contributors

[//]: contributor-faces

 <a href="https://github.com/Faraz710"><img src="https://avatars1.githubusercontent.com/u/64319789?s=400&v=4" title="Faraz" width="80" height="80"></a> <a href="https://github.com/harsh8461-project"><img src="https://avatars1.githubusercontent.com/u/69069039?s=400&v=4" title="Harsh" width="80" height="80"></a>