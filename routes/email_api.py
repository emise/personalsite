from flask import Blueprint, request, jsonify
import smtplib
import email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import settings

email_api = Blueprint('email_api', __name__)

SENDER = 'inquire@liuangela.com'  

RECIPIENT  = settings.RECIPIENT_EMAIL

USERNAME_SMTP = settings.AWS_SES_SMTP_USERNAME
PASSWORD_SMTP = settings.AWS_SES_SMTP_PASSWORD

HOST = f'email-smtp.{settings.AWS_REGION}.amazonaws.com'
PORT = 587

SMTP_SERVER = smtplib.SMTP(HOST, PORT)

@email_api.route('/api/inquire', methods=['POST'])
def send_email():
    """Send an email to the inquire address via frontend contact form to prevent spam."""

    data = request.json

    sender_name = data['name'] + ' from <' + data['email'] + ' >'

    # The subject line of the email.
    subject = '[Personal Site Inquiry] ' + data['subject']

    # The email body for recipients with non-HTML email clients.
    body_text = data['message']

    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = email.utils.formataddr((sender_name, SENDER))
    msg['To'] = RECIPIENT

    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(body_text, 'plain')

    # Attach parts into message container.
    msg.attach(part1)

    # Try to send the message.
    try:
        SMTP_SERVER.ehlo()
        SMTP_SERVER.starttls()
        #stmplib docs recommend calling ehlo() before & after starttls()
        SMTP_SERVER.ehlo()
        SMTP_SERVER.login(USERNAME_SMTP, PASSWORD_SMTP)
        SMTP_SERVER.sendmail(SENDER, RECIPIENT, msg.as_string())
        SMTP_SERVER.close()
    # Display an error message if something goes wrong.
    except Exception:
        raise

    return jsonify({'data': 'success'})
