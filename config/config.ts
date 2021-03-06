export const config = {
    SECRET: process.env.SECRET || "test",
    SECRET_REFRESH: process.env.SECRET_REFRESH || "test refresh",
    SERVICES: {
        GOOGLE_API: {
            BASE_PATH: "https://www.googleapis.com",
            API_KEY: "AIzaSyC76lgW0NSsLtQeVZTd7PyzkzNnaDw31RQ",
            OAUTH: {
                BASE_PATH: "https://oauth2.googleapis.com"
            },
            CALENDAR: {
                CALENDAR_KEY: "d08lrtmdkhj9fesauc6mbkj1ik@group.calendar.google.com"
            }
        }
    }
}

export const google = {
    "type": "service_account",
    "project_id": "api-calendar-sandez",
    "private_key_id": "7e0068ed2ee3e68902b4e14e5cb1769e2b02e3ea",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCIVfQGd6sfPJuh\n/tvdZzKvCmIC7sF/OLKLPEWwYfEOYXIq8g5aP+P6FEAbILFvC29IHPgd/fzsaeUl\nV9i55d9cXNxKMtkY8q35gnf8HX36uxMsqSMD/NLcopxSGDoDErlFX/gJu4MaHDl3\nKtg1xsCt0Li40RY0BytPhLFeFESTACjiXWDTTSCtZvg9B+LSZpCU+czCIGz8/UNl\najc38X9rw5+VO7X/AjztylJMomEFEfSHm6pQN/yfkTeSF4RCN/kCMnJvAmeAWAhO\nunct/5+brFaRLWmpVoOvsJ26FEPv3hKa6pg8EPRXTlNnEG6qZBzGdU3pp83yPfoV\n1ov4TZ4NAgMBAAECggEAEjs1mdnN2IGr1DgMYb6SRgWu6/J5OKXge627KfuRly6L\nwazDI5QbTI6sWz7+II8tueh50NTtShYHw6chfwvQ2H09zhmfnhjxuoW/vXHvg08Z\n9iUbXsX5J/JXfMOVmmHvbuoG9WeNqrkEgZLep85PZ3mbrMdKX08SyRxBoFw4e/8I\nVhVtsO7esyia4zMquuKXL7c7eP4dNXj0pI1tWuWTYlTwE6qJWMDmTdLk1AKfiXOw\nD4bHxg4fXQfH/HntS033ubuKoGWpm1Rtjz44nX8aCaHbUDoHt69dfuWVShjNM/Do\na3eh3251sUSDj5PNIxLX7mGaiqWChBAnYTaH0LJFZwKBgQC8yoGPJwfKeyQg63pt\ntN/C+pUWIDbHOF04w+2UEeXpqq334eDnKhGdYYBsLQ8w/WjbQHa5ppxJale5dh/P\nhBvk3aIlpOOabO1B2AeyNLgpqCwRL3y1wUkCzBmfioFRZ2nb4JsX+E22KgTPMCle\niUZmBi1D6EF6S6mArjT/LVENWwKBgQC43u2ypmrJQKr1FJtv3ZbKB8k1TdnKMkw7\nXnrQdv7ncgVFOPjafPz/TMS9vfLO7jTUOgdCApe6ztr8JGSDiit408DkQoi4TB6S\na1n1J96BOEMKpArq5kh3I7cemZF1Z9ivH9ipMTf2HdaZxjwtb7zp2V9iwXNXImj3\nV47TLgnWtwKBgH8TTAvgeLUJGDN0bU8E7YzfgJSJEHYecVkxQGxnc7tJ4Jm2l9zh\ni0PFCl1GIzCVkgvqoz+pbw9Xnj6+zQCwatoteOQfzff3E+g7EksYg1G+2hKjRS1O\nMefJHAIwh4UUt8OBtsN2plBUjjIrt9zjR9iKldNctR4taaWtHQ0aIrF7AoGAMY6Q\n6XLy7UAIk+oSQMqFwWKU7VURLMKO7NtG0NsVObW28/dxviADMezCUJq6m/3+62Ui\nzO8k/U62JSEcUKaZQKqC6q1rOPwutdFRLAaj/r+2OQQAaTeR9V39mJZSB8burwM6\ncSBgf/k/rbkWKJfrbER47WAuKw1uVd+CydlticECgYEAlXoX3YY84g+m2GtuWxU9\nbjLT7erLlTXhq/8eNHd1LxtcRuB1dH7qAboaZDjC27HI3pYryKR1H+H4z7j1HpJf\n6WmbzBGJfenG0sanqn7s1K4CbmmSrtq8mepIFAtWUYMiDFAd4vsL6NorAOwJG5AY\nrjw82j4gqnpEx28hc28+h4Y=\n-----END PRIVATE KEY-----\n",
    "client_email": "api-calendar-sandez@api-calendar-sandez.iam.gserviceaccount.com",
    "client_id": "114408114744168513971",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/api-calendar-sandez%40api-calendar-sandez.iam.gserviceaccount.com"
}

