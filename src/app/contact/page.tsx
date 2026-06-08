import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { SOCIAL_ICON_MAP } from "@/components/layout/SocialIcons";
import {
  getSiteSetting,
  type HeadOffice,
  type ContactDepartment,
  type SocialLinks,
} from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Natural Plantation — head office in Kilinochchi, departments for general enquiries, B2B, partnerships and careers.",
};

const HOURS = [
  { day: "Monday – Friday", time: "8:30 AM – 5:30 PM" },
  { day: "Saturday", time: "9:00 AM – 1:00 PM" },
  { day: "Sunday & Holidays", time: "Closed" },
];

export default async function ContactPage() {
  const [office, departments, social] = await Promise.all([
    getSiteSetting<HeadOffice>("head_office"),
    getSiteSetting<ContactDepartment[]>("contact_departments"),
    getSiteSetting<SocialLinks>("social_links"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's start a conversation"
        lead="Questions, partnership ideas, or want to stock our products? Reach the right team below."
        image="/images/project-coconut.png"
      />

      <section className="section-y bg-cloud">
        <div className="container-max grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <ContactForm />

          {/* Details */}
          <div className="space-y-6">
            {office && (
              <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-card md:p-8">
                <h2 className="text-h4 font-semibold text-blue-900">{office.name}</h2>
                <p className="mt-1 text-small text-slate-500">Reg. {office.reg_number}</p>
                <ul className="mt-5 space-y-4 text-body text-slate-700">
                  <li className="flex gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-green-600" />
                    <span>
                      {office.address_line1}
                      <br />
                      {office.address_line2}
                    </span>
                  </li>
                  <li>
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-blue-600">
                      <Phone size={20} className="shrink-0 text-green-600" />
                      {office.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${office.email}`} className="flex items-center gap-3 hover:text-blue-600">
                      <Mail size={20} className="shrink-0 text-green-600" />
                      {office.email}
                    </a>
                  </li>
                </ul>

                {social && (
                  <div className="mt-6 flex gap-3 border-t border-slate-200 pt-6">
                    {Object.entries(SOCIAL_ICON_MAP).map(([key, Icon]) =>
                      social[key] ? (
                        <a
                          key={key}
                          href={social[key]}
                          aria-label={key}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-colors hover:bg-green-600 hover:text-white"
                        >
                          <Icon size={17} />
                        </a>
                      ) : null,
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Departments */}
            {departments && departments.length > 0 && (
              <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-card md:p-8">
                <h3 className="text-small font-semibold uppercase tracking-[0.1em] text-green-600">
                  Departments
                </h3>
                <ul className="mt-4 space-y-3">
                  {departments.map((d) => (
                    <li key={d.email} className="flex items-center justify-between gap-4">
                      <span className="text-small text-slate-700">{d.label}</span>
                      <a href={`mailto:${d.email}`} className="text-small font-medium text-blue-600 hover:text-green-700">
                        {d.email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hours */}
            <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-card md:p-8">
              <h3 className="flex items-center gap-2 text-small font-semibold uppercase tracking-[0.1em] text-green-600">
                <Clock size={16} /> Business hours
              </h3>
              <ul className="mt-4 space-y-2.5">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between text-small">
                    <span className="text-slate-700">{h.day}</span>
                    <span className="font-medium text-blue-900">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
