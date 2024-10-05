import { NextResponse } from "next/server";
import { vertex } from '@ai-sdk/google-vertex';
import { generateText } from 'ai';

export async function GET(){
  try {

    const { text } = await generateText({
      model: vertex('gemini-1.5-flash'),
      prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    });

    console.log(text);

    return NextResponse.json({ message: text });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error generating text:', error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
};

export const revalidate = 0;
