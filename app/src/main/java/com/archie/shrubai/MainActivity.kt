package com.archie.shrubai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import com.archie.shrubai.ui.theme.ShrubaiTheme
import com.archie.shrubai.ui.screens.*
import com.archie.shrubai.network.NetworkManager
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ShrubaiTheme {
                MainContent()
            }
        }
    }
}

@Composable
fun MainContent() {
    val context = LocalContext.current
    val networkManager = remember { NetworkManager(context) }
    
    var screenState by remember { mutableStateOf(ScreenState.LOADING) }
    var networkType by remember { mutableStateOf("") }
    val isConnected by networkManager.networkStatusFlow().collectAsState(initial = networkManager.isConnected())
    
    // Handle network status changes
    LaunchedEffect(isConnected) {
        if (screenState == ScreenState.CONTENT || screenState == ScreenState.OFFLINE) {
            screenState = if (isConnected) {
                networkType = networkManager.getNetworkType()
                ScreenState.CONTENT
            } else {
                ScreenState.OFFLINE
            }
        }
    }
    
    // Initial loading
    LaunchedEffect(Unit) {
        delay(2000) // Show loading screen for 2 seconds
        screenState = if (isConnected) {
            networkType = networkManager.getNetworkType()
            ScreenState.CONTENT
        } else {
            ScreenState.OFFLINE
        }
    }
    
    when (screenState) {
        ScreenState.LOADING -> {
            LoadingScreen(message = "Starting up...")
        }
        ScreenState.OFFLINE -> {
            OfflineScreen(
                onRetryClick = {
                    if (networkManager.isConnected()) {
                        networkType = networkManager.getNetworkType()
                        screenState = ScreenState.CONTENT
                    }
                }
            )
        }
        ScreenState.CONTENT -> {
            Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                MainScreen(
                    modifier = Modifier.padding(innerPadding),
                    networkType = networkType
                )
            }
        }
    }
}