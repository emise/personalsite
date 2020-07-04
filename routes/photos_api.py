from flask import Blueprint, request, abort, jsonify
import boto3

import settings

photos_api = Blueprint('photos_api', __name__)

BUCKET_NAME = 'angelaliu-photoshoot'
s3 = boto3.resource(
	's3',
	region_name='us-east-1',
	aws_access_key_id=settings.AWS_SERVER_PUBLIC_KEY,
    aws_secret_access_key=settings.AWS_SERVER_SECRET_KEY,
)
bucket = s3.Bucket(BUCKET_NAME)


@photos_api.route('/api/photos', methods=['GET'])
def get_photos():
    """Get available photos from s3 bucket"""
    body = request.json
    for obj in bucket.objects.all():
    	if obj.key.endswith('.jpg'):
    		public_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{obj.key}'
    		print(public_url)

    return jsonify({'result': 'hi'})
