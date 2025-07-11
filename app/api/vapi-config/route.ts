import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Server-side environment variables (not exposed to client)
    const vapiConfig = {
      assistantId: process.env.VAPI_ASSISTANT_ID || '',
      publicApiKey: process.env.VAPI_PUBLIC_API_KEY || '',
      agentName: process.env.AGENT_NAME || 'YallaTalk Assistant',
    };

    // Validate that required environment variables are present
    if (!vapiConfig.assistantId || !vapiConfig.publicApiKey) {
      return NextResponse.json(
        { error: 'Missing required Vapi configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json(vapiConfig);
  } catch (error) {
    console.error('Error fetching Vapi configuration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Vapi configuration' },
      { status: 500 }
    );
  }
}