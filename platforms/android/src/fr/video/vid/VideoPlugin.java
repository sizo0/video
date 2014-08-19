package fr.video.vid;

import java.lang.reflect.Field;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.widget.VideoView;

public class VideoPlugin extends Activity  {

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        setContentView(R.layout.main);
        System.out.println("layout");
    }
	@JavascriptInterface
    public void playVideo(final String name) {
		final VideoPlugin self = this;
		runOnUiThread(new Runnable() {
			 public void run() {
				 VideoView mVideoView = null;
				 try {
					 mVideoView = (VideoView) findViewById(R.id.videoview);
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("errorfindview");
					return;
				}
				try {
					Field field = R.raw.class.getField(name);
					String uriPath = "android.resource://fr.video.vid/" + field.toString();
					Uri uri = Uri.parse(uriPath);
					mVideoView.setVideoURI(uri);
					mVideoView.requestFocus();
					mVideoView.start();
				} catch (NoSuchFieldException e) {
					// TODO Auto-generated catch block
					System.out.println("error");
					e.printStackTrace();
				}
			 }
		});
		
    }
}
