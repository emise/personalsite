from flask import Blueprint, jsonify
import boto3
from typing import List, Optional

import settings

photos_api = Blueprint('photos_api', __name__)

BUCKET_NAME = 'angelaliu-photoshoot'
s3 = boto3.resource(
    's3',
    region_name=settings.AWS_REGION,
    aws_access_key_id=settings.AWS_SERVER_PUBLIC_KEY,
    aws_secret_access_key=settings.AWS_SERVER_SECRET_KEY,
)
S3_BUCKET = s3.Bucket(BUCKET_NAME)


@photos_api.route('/api/photos', methods=['GET'])
@photos_api.route('/api/photos/<photoshoot_date>', methods=['GET'])
def get_photos(photoshoot_date: Optional = None):
    """
    Get all available photoshoot dates from s3, or fetch all photos from a specific photoshoot.
    """
    data: List[str] = []

    if not photoshoot_date:
        data = _get_photoshoot_dates()
    else:
        data = _get_photos_for_date(photoshoot_date=photoshoot_date)

    return jsonify({'data': data})


def _get_photoshoot_dates() -> List[str]:
    folder_names = []
    for obj in S3_BUCKET.objects.all():
        if obj.key.endswith('/'):
            folder_name = obj.key[:-1]
            folder_names.append(folder_name)
    return folder_names


def _get_photos_for_date(photoshoot_date: str) -> List[str]:
    photo_urls = []
    for obj in S3_BUCKET.objects.filter(Prefix=photoshoot_date):
        if obj.key.endswith('.jpg'):
            public_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{obj.key}'
            photo_urls.append(public_url)
    return photo_urls
