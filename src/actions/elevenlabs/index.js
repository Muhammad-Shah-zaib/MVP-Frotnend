"use server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function getElevenLabsSignedUrl() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/elevenlabs/get-signed-url`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch signed URL: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      signedUrl: data.signedUrl,
      agentId: data.agentId
    };
    
  } catch (error) {
    console.error('Error fetching ElevenLabs signed URL:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to get signed URL'
    };
  }
}
