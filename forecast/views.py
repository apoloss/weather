# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render
from django.http import HttpResponse
import requests
from django.conf import settings

def index(request):
	#https://api.darksky.net/forecast/[key]/[latitude],[longitude]
	r = requests.get('https://api.darksky.net/forecast/' + settings.DARKSKY_KEY + '/' + '42.3601,-71.0589')
	data = r.json()
	return HttpResponse(json.dumps(data), content_type="application/json")
