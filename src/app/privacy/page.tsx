import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি",
  description: "এই ওয়েবসাইটের প্রদর্শনী যোগাযোগ ফর্ম ও তথ্য ব্যবহারের বিবরণ।",
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <Container className="privacy-page">
      <header className="privacy-page-heading">
        <p className="section-eyebrow">গোপনীয়তা</p>
        <h1 className="section-heading">গোপনীয়তা সম্পর্কে</h1>
        <p className="section-description">
          এই সাইটের যোগাযোগ ফর্ম বর্তমানে প্রদর্শনী পর্যায়ে রয়েছে।
        </p>
      </header>
      <div className="privacy-content">
        <section aria-labelledby="form-data-heading">
          <h2 id="form-data-heading">যোগাযোগ ফর্মের তথ্য</h2>
          <p>
            ফর্মে লেখা নাম, ইমেইল, ফোন নম্বর ও বার্তা শুধু এই পৃষ্ঠায়
            ইনপুট যাচাইয়ের জন্য ব্যবহৃত হয়। ফর্মটি কোনো সার্ভার বা ইমেইল
            সেবায় তথ্য পাঠায় না এবং সাইটের পক্ষ থেকে ফর্মের তথ্য সংরক্ষণ
            করা হয় না। ইনপুটগুলো কেবল পৃষ্ঠায় অস্থায়ীভাবে থাকে।
          </p>
          <p>
            ফর্মটি সংযুক্ত না হওয়া পর্যন্ত সংবেদনশীল বা গোপন তথ্য এতে লিখবেন
            না। যোগাযোগ করতে প্রদর্শিত ইমেইল বা ফোন ব্যবহার করুন; সেই
            যোগাযোগের মাধ্যমের নিজস্ব গোপনীয়তা নীতি প্রযোজ্য হতে পারে।
          </p>
        </section>
        <section aria-labelledby="future-changes-heading">
          <h2 id="future-changes-heading">পরিবর্তন</h2>
          <p>
            যোগাযোগ ফর্ম বা তথ্য ব্যবহারের পদ্ধতি পরিবর্তিত হলে এই পাতার
            বিবরণ হালনাগাদ করা হবে। বর্তমানে ফর্ম জমা দেওয়ার কোনো কার্যকর
            ব্যবস্থা নেই।
          </p>
        </section>
      </div>
    </Container>
  );
}
