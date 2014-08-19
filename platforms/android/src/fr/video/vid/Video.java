/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package fr.video.vid;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Video extends CordovaActivity 
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        // Set by <content src="index.html" /> in config.xml
        appView.addJavascriptInterface(new VideoPlugin(), "VideoPlugin");
        appView.addJavascriptInterface(this, "Video");
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html");
    }

	@JavascriptInterface
    public void startVideoActivity(final String name){
    	final Video self = this;
		runOnUiThread(new Runnable() {
			 public void run() {
				try {
					Intent intent = new Intent(self, VideoPlugin.class);
					Bundle b = new Bundle();
					b.putString("name", name);
					intent.putExtras(b);
					startActivity(intent);
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
		});
    }
	
	@Override
	protected void onStop() {
	    Log.w(TAG, "App stopped");
	    super.onStop();
	}

	@Override
	public void onDestroy() {
	    Log.w(TAG, "App destoryed");
	    super.onDestroy();
	}
}

