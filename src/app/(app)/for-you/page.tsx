import { getSelectedBook, getRecommendedBooks, getSuggestedBooks } from "@/lib/api";
import ForYouContent from "./ForYouContent";

export default async function ForYouPage() {
  const [selectedBook, recommendedBooks, suggestedBooks] = await Promise.all([
    getSelectedBook(),
    getRecommendedBooks(),
    getSuggestedBooks(),
  ]);

  return (
    <ForYouContent
      selectedBook={selectedBook}
      recommendedBooks={recommendedBooks}
      suggestedBooks={suggestedBooks}
    />
  );
}
