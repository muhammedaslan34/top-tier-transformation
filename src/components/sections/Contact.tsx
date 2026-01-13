import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Search } from "lucide-react";
import { toast } from "sonner";
import PhoneInput, { type Value as PhoneValue, getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import "react-phone-number-input/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const serviceKeys = [
  "digitalTransformation",
  "dataGovernance",
  "cloudComputing",
  "beneficiaryExperience",
  "innovationServices",
  "governanceRiskCompliance",
];

// Custom Country Selector Component
function CountrySelect({ value, onChange, labels: defaultLabels, ...rest }: any) {
  const [open, setOpen] = useState(false);
  const countries = getCountries();
  const labels = defaultLabels || en;

  const selectedCountry = value || "SA";
  const selectedCountryCode = getCountryCallingCode(selectedCountry);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 relative pr-0.5 pl-3 h-full",
            "focus:outline-none"
          )}
          aria-label="Select country"
        >
          <div className="w-6 h-4 rounded border border-border/50 overflow-hidden flex-shrink-0">
            <img
              src={`https://flagcdn.com/w20/${selectedCountry.toLowerCase()}.png`}
              alt={labels[selectedCountry]}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country or code..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => {
                const countryCode = getCountryCallingCode(country);
                const countryName = labels[country] || country;
                return (
                  <CommandItem
                    key={country}
                    value={`${countryName} ${countryCode} +${countryCode}`}
                    onSelect={() => {
                      onChange(country);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-6 h-4 rounded border border-border/50 overflow-hidden flex-shrink-0">
                      <img
                        src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                        alt={countryName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <span className="flex-1">{countryName}</span>
                    <span className="text-sm text-muted-foreground">+{countryCode}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState<PhoneValue>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(t("contact.form.success"), {
      description: t("contact.form.successDescription"),
    });
    
    setIsSubmitting(false);
    setPhoneValue(undefined);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            {t("contact.title")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6"
          >
            {t("contact.heading")}{" "}
            <span className="text-gradient">{t("contact.headingHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t("contact.description")}
          </motion.p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                {t("contact.contactInformation")}
              </h3>
              <p className="text-muted-foreground mb-8">
                {t("contact.descriptionText")}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, key: "email", value: "sales@toptiertech.com" },
                { icon: Phone, key: "phone", value: "+966566955403" },
                { icon: MapPin, key: "address", value: "12245 Riyadh.Al Sulaimaniyah Dist" },
              ].map((item) => (
                <div key={item.key} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t(`contact.${item.key}`)}</div>
                    <div className="font-medium text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick benefits */}
            <div className="pt-8 border-t border-border">
              <h4 className="font-semibold text-foreground mb-4">{t("contact.whatToExpect")}</h4>
              <ul className="space-y-3">
                {[
                  "response24h",
                  "freeConsultation",
                  "customizedProposals",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {t(`contact.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("contact.form.name")}</label>
                  <Input 
                    placeholder={t("contact.form.namePlaceholder")} 
                    required 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("contact.form.companyName")}</label>
                  <Input 
                    placeholder={t("contact.form.companyNamePlaceholder")} 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("contact.form.email")}</label>
                  <Input 
                    type="email" 
                    placeholder={t("contact.form.emailPlaceholder")} 
                    required 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2 ">
                  <label className="text-sm font-medium text-foreground">{t("contact.form.phone")}</label>
                  <PhoneInput
                    required 
                    international
                    defaultCountry="SA"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    placeholder={t("contact.form.phonePlaceholder")}
                    className="phone-input-custom"
                    countrySelectComponent={CountrySelect}
                    numberInputProps={{
                      className: "flex-1 h-full  px-3 bg-transparent text-foreground focus:outline-none border-0 text-sm"
                    }}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">{t("contact.form.serviceInterest")}</label>
                  <Select required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("contact.form.servicePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceKeys.map((serviceKey) => (
                        <SelectItem key={serviceKey} value={serviceKey}>
                          {t(`services.${serviceKey}.title`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">{t("contact.form.message")}</label>
                  <Textarea 
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                    className="min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t("common.sending")
                ) : (
                  <>
                    {t("common.sendMessage")}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
