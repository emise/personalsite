from flask import Blueprint, jsonify
import boto3
import json
from typing import Dict, List, Optional, Tuple

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
@photos_api.route('/api/photos/<photoshoot_name>', methods=['GET'])
def get_photos(photoshoot_name: Optional = None):
    """
    Get all available photoshoot dates from s3, or fetch all photos from a specific photoshoot"""
    data: List[str] = []
    description: Optional[Dict[str, str]] = None

    if not photoshoot_name:
        data = _get_photoshoot_names()
    else:
        data, description = _get_thumbnails_for_date(photoshoot_name=photoshoot_name)

    return jsonify({'data': data, 'description': description})


def _get_photoshoot_names() -> List[str]:
    folder_names = []
    for obj in S3_BUCKET.objects.all():
        if obj.key.endswith('/'):
            folder_name = obj.key[:-1]
            folder_names.append(folder_name)
    return folder_names


def _get_thumbnails_for_date(photoshoot_name: str) -> Tuple[List[str], Optional[Dict[str, str]]]:
    """Fetch photo thumbnails"""
    thumbnail_urls = []
    for obj in S3_BUCKET.objects.filter(Prefix=photoshoot_name):
        if 'thumb-' in obj.key:
            public_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{obj.key}'
            thumbnail_urls.append(public_url)
        elif '.json' in obj.key:
            description_json = obj.get()['Body'].read().decode('utf-8')
            description = json.loads(description_json)
    return thumbnail_urls, description
