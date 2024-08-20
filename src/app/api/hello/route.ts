import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Make the API request to the third-party service
        const response = await fetch(`https://api.jikan.moe/v4/anime`);

        // Check if the response is successful
        if (!response.ok) {
            // Handle HTTP errors
            return NextResponse.json(
                { error: 'Failed to fetch data from the third-party API' },
                { status: response.status }
            );
        }

        // Parse the JSON data
        const data = await response.json();

        // Return the data as a JSON response
        return NextResponse.json(data);

    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        return NextResponse.json(
            { error: 'An error occurred while fetching data from the third-party API' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    return NextResponse.json({ message: 'Data received', data: body });
}
