build:
	npm run build
deploy:build
	aws s3 cp --recursive dist/ s3://laudershoptest  --grants read=uri=http://laudershoptest.s3-website-us-east-1.amazonaws.com