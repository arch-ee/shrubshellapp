package com.archie.shrubai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.archie.shrubai.ui.theme.ShrubaiTheme
import com.archie.shrubai.ui.screens.*
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
    var screenState by remember { mutableStateOf(ScreenState.LOADING) }
    
    // Simulate loading and network check
    LaunchedEffect(Unit) {
        delay(2000) // Simulate loading time
        // Simulate network check - you can replace this with actual network logic
        val isOnline = true // Change to false to test offline screen
        screenState = if (isOnline) ScreenState.CONTENT else ScreenState.OFFLINE
    }
    
    when (screenState) {
        ScreenState.LOADING -> {
            LoadingScreen(message = "Starting ShrubAI...")
        }
        ScreenState.OFFLINE -> {
            OfflineScreen(
                onRetryClick = {
                    screenState = ScreenState.LOADING
                    // Simulate retry logic
                }
            )
        }
        ScreenState.CONTENT -> {
            Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                Greeting(
                    name = "ShrubAI",
                    modifier = Modifier.padding(innerPadding)
                )
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Welcome to $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    ShrubaiTheme {
        Greeting("ShrubAI")
    }
}