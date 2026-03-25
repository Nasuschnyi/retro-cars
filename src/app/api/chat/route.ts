import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ChatRequest = {
	input?: string;
};

export async function POST(request: Request) {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		return NextResponse.json(
			{ error: 'Missing OPENAI_API_KEY' },
			{ status: 500 }
		);
	}

	// Instantiate lazily so build-time module evaluation doesn't require the key.
	const client = new OpenAI({ apiKey });

	let body: ChatRequest | null = null;
	try {
		body = await request.json();
	} catch {
		body = null;
	}

	const input = typeof body?.input === 'string' ? body.input.trim() : '';

	if (!input) {
		return NextResponse.json({ error: 'Missing input' }, { status: 400 });
	}

	try {
		const response = await client.responses.create({
			model: process.env.OPENAI_MODEL ?? 'gpt-5',
			input,
		});

		return NextResponse.json({
			id: response.id,
			output_text: response.output_text ?? '',
		});
	} catch (error) {
		console.error('OpenAI API error', error);
		return NextResponse.json(
			{ error: 'OpenAI request failed' },
			{ status: 500 }
		);
	}
}
