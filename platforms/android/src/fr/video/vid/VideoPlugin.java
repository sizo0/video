package fr.video.vid;

import java.lang.reflect.Field;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.widget.MediaController;
import android.widget.VideoView;

public class VideoPlugin extends Activity  {

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
    	super.onCreate(savedInstanceState);
    	Bundle b = getIntent().getExtras();
    	String name = b.getString("name");
        setContentView(R.layout.main);
        this.playVideo(name);
    }
	@JavascriptInterface
    public void playVideo(String name) {
		 VideoView mVideoView = null;
		 try {
			 mVideoView = (VideoView) findViewById(R.id.videoview);
		} catch (Exception e) {
			e.printStackTrace();
			return;
		}
		try {
			R r = new R();
			Field field = R.raw.class.getField(name);
			String uriPath = "android.resource://" + getPackageName() + "/" + field.getLong(r);
			//System.out.println(uriPath);
			Uri uri = Uri.parse(uriPath);
			mVideoView.setVideoURI(uri);
			mVideoView.setMediaController(new MediaController(this));
			mVideoView.requestFocus();
			mVideoView.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

	@Override
	protected void onStop() {
	    super.onStop();
	}

	@Override
	public void onDestroy() {
	    super.onDestroy();
	}
}
