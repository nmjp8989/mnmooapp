package com.mnmoo.firstgradelearninggames;

import android.content.pm.InstallSourceInfo;
import android.content.pm.PackageManager;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "StoreDetector")
public class StoreDetectorPlugin extends Plugin {
    private static final String AMAZON_INSTALLER = "com.amazon.venezia";
    private static final String GOOGLE_INSTALLER = "com.android.vending";

    @SuppressWarnings("deprecation")
    @PluginMethod
    public void getStore(PluginCall call) {
        String installer = null;

        try {
            PackageManager packageManager = getContext().getPackageManager();
            String packageName = getContext().getPackageName();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                InstallSourceInfo sourceInfo =
                    packageManager.getInstallSourceInfo(packageName);
                installer = sourceInfo.getInstallingPackageName();

                if (installer == null) {
                    installer = sourceInfo.getInitiatingPackageName();
                }
            } else {
                installer = packageManager.getInstallerPackageName(packageName);
            }
        } catch (Exception ignored) {
            // Sideloaded and development builds may not report an installer.
        }

        boolean isAmazonDevice =
            "Amazon".equalsIgnoreCase(Build.MANUFACTURER);
        boolean isAmazonStore = AMAZON_INSTALLER.equals(installer);
        boolean isGoogleStore = GOOGLE_INSTALLER.equals(installer);
        boolean useAmazon =
            isAmazonStore || (!isGoogleStore && isAmazonDevice);

        JSObject result = new JSObject();
        result.put("store", useAmazon ? "amazon" : "google");
        result.put("installer", installer == null ? "unknown" : installer);
        result.put("manufacturer", Build.MANUFACTURER);
        call.resolve(result);
    }
}
