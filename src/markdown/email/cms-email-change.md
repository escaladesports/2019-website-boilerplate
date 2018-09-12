---
title: Confirm Change of Email
template: cms-email
---

## Confirm Change of Email

Follow this link to confirm the update of your email from {{ .Email}} to {{ .NewEmail}}:

<a href='{{ .SiteURL }}/admin/#email_change_token={{ .Token }}'>Change Email</a>