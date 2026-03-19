import React, { useState } from 'react';
import { ShoppingBag, X, Phone, Instagram, ArrowLeft, CheckCircle2, PlayCircle, Calendar, Clock, ChevronRight, Settings, Lock, Mail } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- מערכת קביעת תורים ---
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // --- מערכת מנהלת וסנכרון יומן (סימולציה) ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCalendarSynced, setIsCalendarSynced] = useState(false);
  const [googleAuthStep, setGoogleAuthStep] = useState(0); 

  const treatmentsList = [
    { id: 't1', name: 'ייעוץ ואבחון עור', duration: '30 דק\'' },
    { id: 't2', name: 'טיפול אקנה מקיף + פוטותרפיה', duration: '60 דק\'' },
    { id: 't3', name: 'טיפול מסיכת זן (Zen Mask)', duration: '45 דק\'' },
    { id: 't4', name: 'שיקום עור מתקדם (20/80)', duration: '60 דק\'' },
  ];

  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  }).filter(d => d.getDay() !== 6); 

  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsBookingComplete(true);
    }, 800);
  };

  // --- מערכת חנות ---
  const [selectedCategory, setSelectedCategory] = useState('הכל');

  const products = [
    { id: 1, name: 'ערכת אקנה', category: 'ערכות טיפול', description: 'Forte, Therapist, Nourisher 1, Purifier, Sunsitive', price: 1145, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Acne+Kit' },
    { id: 2, name: 'ערכת הבהרה עם רטינול', category: 'ערכות טיפול', description: 'Melanight, Melaboost, Purifier, Sunsitive', price: 1200, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Brightening+Kit' },
    { id: 3, name: 'ערכת הבהרה ללא רטינול', category: 'ערכות טיפול', description: 'Melaclear, Polisher, Purifier, Sunsitive', price: 990, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Brightening+No+Retinol' },
    { id: 4, name: 'צמד סאנסטיב', category: 'ערכות טיפול', description: 'Sunsitive + Sunsitive Stay Put Spray', price: 355, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Sunsitive+Duo' },
    { id: 5, name: 'ZEN MASK (100ml)', category: 'מסכות וקרמים', description: 'מסכת הרגעה וניקוי רעלים', price: 300, image: '/zen-product.jpeg' },
    { id: 6, name: 'ZEN MASK (250ml)', category: 'מסכות וקרמים', description: 'מסכת הרגעה וניקוי רעלים (גודל מקצועי)', price: 400, image: '/zen-product.jpeg' },
    { id: 7, name: 'FORTE', category: 'מסכות וקרמים', description: 'קרם פעיל לחידוש ושיקום', price: 355, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Forte' },
    { id: 8, name: 'THERAPIST', category: 'מסכות וקרמים', description: 'קרם טיפולי לאיזון העור', price: 355, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Therapist' },
    { id: 9, name: 'POLISHER', category: 'מסכות וקרמים', description: 'קרם פילינג עדין לחידוש', price: 355, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Polisher' },
    { id: 10, name: 'MELACLEAR', category: 'מסכות וקרמים', description: 'קרם הבהרה פעיל', price: 425, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Melaclear' },
    { id: 11, name: 'NOURISHER 1', category: 'מסכות וקרמים', description: 'קרם לחות והזנה', price: 240, image: '/zen-product.jpeg' },
    { id: 12, name: 'NOURISHER 3', category: 'מסכות וקרמים', description: 'קרם לחות והזנה מועשר עמוק', price: 260, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Nourisher+3' },
    { id: 13, name: 'RESTORE', category: 'מסכות וקרמים', description: 'קרם לחות משקם לעור מגורה', price: 215, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Restore' },
    { id: 14, name: 'MELAMIGHT', category: 'מסכות וקרמים', description: 'טיפול הבהרה עוצמתי (במרשם)', price: 555, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Melamight' },
    { id: 15, name: 'MELANIGHT', category: 'מסכות וקרמים', description: 'קרם לילה מבהיר ומחדש', price: 425, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Melanight' },
    { id: 16, name: 'MELABOOST', category: 'מסכות וקרמים', description: 'בוסטר הבהרה ממוקד', price: 425, image: 'https://placehold.co/400x500/2a2a2a/ffffff?text=Melaboost' },
    { id: 17, name: 'VITALITY (100ml)', category: 'מסכות וקרמים', description: 'קרם ויטליטי להחזרת חיוניות', price: 260, image: 'https://placehold.co/400x500/a75d50/ffffff?text=Vitality+100ml' },
    { id: 18, name: 'VITALITY (250ml)', category: 'מסכות וקרמים', description: 'קרם ויטליטי (גודל מקצועי)', price: 365, image: 'https://placehold.co/400x500/a75d50/ffffff?text=Vitality+250ml' },
    { id: 19, name: 'LUMACORE SERUM', category: 'סרומים', description: 'סרום לומאקור להזנה עמוקה', price: 430, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Lumacore' },
    { id: 20, name: 'BIOTIC SERUM', category: 'סרומים', description: 'סרום ביוטיק לאיזון הפלורה הטבעית', price: 390, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Biotic' },
    { id: 21, name: 'BLUEVIVE SERUM', category: 'סרומים', description: 'סרום בלו-וייב אנטי-אייג\'ינג', price: 480, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Bluevive' },
    { id: 22, name: 'TOPLUS SERUM', category: 'סרומים', description: 'סרום טופ-פלוס למיצוק וזוהר', price: 430, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Toplus' },
    { id: 23, name: 'PURIFIER', category: 'ניקוי והגנה', description: 'סבון פנים לניקוי יסודי', price: 150, image: 'https://placehold.co/400x500/f5f5f5/2a2a2a?text=Purifier' },
    { id: 24, name: 'SUNSITIVE', category: 'ניקוי והגנה', description: 'קרם הגנה לפנים', price: 180, image: 'https://placehold.co/400x500/f5f5f5/eab308?text=Sunsitive' },
    { id: 25, name: 'SUNSITIVE STAY PUT SPRAY', category: 'ניקוי והגנה', description: 'ספריי הגנה', price: 250, image: 'https://placehold.co/400x500/f5f5f5/eab308?text=Sunsitive+Spray' },
  ];

  const categories = ['הכל', 'ערכות טיפול', 'מסכות וקרמים', 'סרומים', 'ניקוי והגנה'];
  
  const filteredProducts = selectedCategory === 'הכל' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-stone-50 font-sans text-stone-800">
      
      {/* תפריט עליון */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpeg" 
                alt="Korin Elbaz Logo" 
                className="h-16 object-contain mix-blend-multiply" 
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>

            <div className="hidden md:flex space-x-8 space-x-reverse">
              <a href="#about" className="text-stone-600 hover:text-amber-700 transition">אודות</a>
              <a href="#videos" className="text-stone-600 hover:text-amber-700 transition">טיפולים</a>
              <a href="#results" className="text-stone-600 hover:text-amber-700 transition">לפני ואחרי</a>
              <a href="#shop" className="text-stone-600 hover:text-amber-700 transition font-medium">חנות מוצרים</a>
              <a href="#booking" className="text-amber-700 font-bold hover:text-amber-800 transition border-b-2 border-amber-700">קביעת תור</a>
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-stone-600 hover:text-amber-700 transition">
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-amber-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* עגלת קניות צידית */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-stone-50">
              <h2 className="text-xl font-serif font-semibold">עגלת קניות ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-200 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-stone-500 mt-10">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>העגלה שלך ריקה כרגע.</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800">{item.name}</h3>
                      <p className="text-amber-700 font-semibold mt-1">₪{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-stone-400 hover:text-red-500 self-start"><X size={18} /></button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-stone-50">
                <div className="flex justify-between text-lg font-bold mb-4 text-stone-800">
                  <span>סך הכל:</span><span>₪{cartTotal}</span>
                </div>
                <button className="w-full bg-amber-700 text-white py-3 rounded-md font-medium hover:bg-amber-800 transition shadow-md">
                  מעבר לתשלום מאובטח
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* אזור ראשי (Hero) */}
      <section className="relative pt-20 bg-stone-100">
        <div className="absolute inset-0 z-0">
          <img src="/hero.jpeg" alt="Clinic background" className="w-full h-[600px] object-cover object-top opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[600px] flex items-center">
          <div className="max-w-xl">
            <span className="text-amber-700 font-semibold tracking-wider mb-2 block">LONGEVITY IS A STRATEGY, NOT A TREND</span>
            <h1 className="text-5xl font-serif text-stone-900 leading-tight mb-6">העור שלך,<br />המומחיות שלנו.</h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              טיפולי אסתטיקה מתקדמים, שיקום עור אקנתי וטכנולוגיות חדשניות המותאמות אישית לעור הפנים שלך. גלי את סדרת מוצרי 20/80 לתוצאות שנשארות.
            </p>
            <div className="flex gap-4">
              <a href="#booking" className="bg-stone-900 text-white px-8 py-3 rounded-md font-medium hover:bg-stone-800 transition">קביעת ייעוץ אישי</a>
              <a href="#shop" className="border-2 border-stone-900 text-stone-900 px-8 py-3 rounded-md font-medium hover:bg-stone-900 hover:text-white transition flex items-center gap-2">
                רכישת מוצרים <ArrowLeft size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* אודות */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-100 rounded-lg transform rotate-3"></div>
              <img 
                src="/about.jpeg" 
                alt="קורין אלבז" 
                className="relative rounded-lg shadow-xl w-full object-cover aspect-[4/5] object-top"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-stone-900 mb-6">נעים להכיר, קורין אלבז</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                מומחית לאסתטיקה ויופי בעלת ניסיון רב בשיקום עור, טיפול באקנה, והתאמת שגרת טיפוח אישית. 
                האני מאמין שלי הוא שיופי אמיתי מתחיל מעור בריא. 
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed">
                "זה לא פילטר, זה טיפול חורף נכון." אני מזמינה אותך לקליניקה שלי לחוויה יוקרתית שמשלבת חומרים פעילים מבית 20/80 Multitasking Skincare וטכנולוגיות מתקדמות כדי להגיע לתוצאות מקסימליות.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-stone-700"><CheckCircle2 className="text-amber-600 ml-2" size={20}/> התאמה אישית של תוכנית טיפול</li>
                <li className="flex items-center text-stone-700"><CheckCircle2 className="text-amber-600 ml-2" size={20}/> שימוש בטכנולוגיות מתקדמות</li>
                <li className="flex items-center text-stone-700"><CheckCircle2 className="text-amber-600 ml-2" size={20}/> ליווי צמוד עד להשגת התוצאה</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* אזור סרטוני טיפול */}
      <section id="videos" className="py-20 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-semibold tracking-wider mb-2 block uppercase text-sm">Experience the clinic</span>
            <h2 className="text-3xl font-serif text-white mb-4">הצצה לטיפולים בקליניקה</h2>
            <p className="text-stone-400">
              הטכנולוגיות המתקדמות ביותר בעולם האסתטיקה, ישירות בקליניקה שלנו.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group rounded-xl overflow-hidden shadow-2xl bg-black border border-stone-800">
              <video autoPlay loop muted playsInline className="w-full h-[400px] object-cover opacity-90 group-hover:opacity-100 transition duration-500">
                <source src="/video1.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-lg font-medium text-white mb-1">טכנולוגיית Apollo Duet</h3>
                <p className="text-stone-300 text-sm">מיצוק, החדרת לחויות וטיפול אנטי-אייג'ינג מתקדם.</p>
              </div>
            </div>

            <div className="relative group rounded-xl overflow-hidden shadow-2xl bg-black border border-stone-800">
              <video autoPlay loop muted playsInline className="w-full h-[400px] object-cover opacity-90 group-hover:opacity-100 transition duration-500">
                <source src="/video2.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-lg font-medium text-white mb-1">פוטותרפיה LED ומסכות</h3>
                <p className="text-stone-300 text-sm">טיפול באור לחיסול חיידקי אקנה ועידוד ייצור קולגן.</p>
              </div>
            </div>

            <div className="relative group rounded-xl overflow-hidden shadow-2xl bg-black border border-stone-800">
              <video autoPlay loop muted playsInline className="w-full h-[400px] object-cover opacity-90 group-hover:opacity-100 transition duration-500">
                <source src="/video3.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-lg font-medium text-white mb-1">ניקוי עמוק ואדים</h3>
                <p className="text-stone-300 text-sm">הכנת העור לטיפול, ריכוך הנקבוביות וניקוי יסודי.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* גלריית תוצאות טיפולים */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">תוצאות שמדברות בעד עצמן</h2>
            <p className="text-stone-600">
              הצלחות קליניות בטיפולי אקנה ושיקום העור. אנחנו מתעדים כל שלב בתהליך.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md group">
              <div className="relative h-64 overflow-hidden">
                <img src="/acne.jpeg" alt="טיפול אקנה" className="w-full h-full object-cover transition transform group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-700">
                  אמצע התהליך
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-900 mb-2">שיקום אקנה - טיפול בחודשיים</h3>
                <p className="text-stone-600 text-sm">שילוב של ערכת דמלוסופי ופוטותרפיה בקליניקה.</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md group">
              <div className="relative h-64 overflow-hidden">
                <img src="/led.jpeg" alt="פוטותרפיה לד" className="w-full h-full object-cover transition transform group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-900 mb-2">טכנולוגיית פוטותרפיה LED</h3>
                <p className="text-stone-600 text-sm">טיפול באור כחול לחיסול חיידקי האקנה והרגעת דלקתיות בעור.</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md group">
              <div className="relative h-64 overflow-hidden">
                <img src="/zen-treatment.jpeg" alt="טיפול Zen Mask" className="w-full h-full object-cover transition transform group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-900 mb-2">טיפול Zen Mask</h3>
                <p className="text-stone-600 text-sm">החדרת לחויות, ניקוי עמוק והזנה עם סדרת מוצרי הפרימיום 20/80.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* גלריית אווירה בקליניקה */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">רגעים מהקליניקה</h2>
            <p className="text-stone-600">יופי, זוהר ושגרת טיפוח שכיף להתמיד בה.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-lg shadow-sm">
              <img src="/clinic1.jpeg" className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" alt="Fun with Zen Mask" />
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-sm">
              <img src="/clinic2.jpeg" className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" alt="Glowing skin treatment" />
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-sm">
              <img src="/clinic3.jpeg" className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" alt="Treatment preparation" />
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-sm">
              <img src="/clinic4.jpeg" className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" alt="Zen mask close up" />
            </div>
          </div>
        </div>
      </section>

      {/* יומן טיפולים */}
      <section id="booking" className="py-20 bg-stone-900 text-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-4">קביעת תור בקליניקה</h2>
            <p className="text-stone-400">בחרי את הטיפול והזמן הנוח לך. התור יסתנכרן ישירות ליומן שלנו.</p>
            {isCalendarSynced && (
              <div className="mt-4 inline-flex items-center bg-green-900/30 text-green-400 border border-green-800 px-4 py-2 rounded-full text-sm">
                <CheckCircle2 size={16} className="ml-2" /> מחובר ומסונכרן ליומן: Korinosh@gmail.com
              </div>
            )}
          </div>

          <div className="bg-white text-stone-800 rounded-xl shadow-2xl p-6 md:p-10">
            {isBookingComplete ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">התור נקבע בהצלחה!</h3>
                <p className="text-stone-600 mb-6">מחכים לראותך בקליניקה בתאריך {selectedDate?.toLocaleDateString('he-IL')} בשעה {selectedTime}.</p>
                {isCalendarSynced && (
                  <p className="text-amber-700 font-medium mb-6 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <Calendar size={18} className="inline mr-1" /> התור סונכרן אוטומטית ליומן גוגל של הקליניקה.
                  </p>
                )}
                <button 
                  onClick={() => { setIsBookingComplete(false); setBookingStep(1); setSelectedTreatment(null); setSelectedDate(null); setSelectedTime(null); setBookingName(''); setBookingPhone(''); }}
                  className="bg-amber-700 text-white px-8 py-3 rounded-md font-medium hover:bg-amber-800 transition"
                >קביעת תור נוסף</button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-8 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-100 -z-10 -translate-y-1/2 rounded"></div>
                  {[1, 2, 3].map((step) => (
                    <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white ${bookingStep >= step ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-500'}`}>
                      {step}
                    </div>
                  ))}
                </div>

                {bookingStep === 1 && (
                  <div>
                    <h3 className="text-xl font-medium mb-6">באיזה טיפול את מעוניינת?</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {treatmentsList.map((treatment) => (
                        <button key={treatment.id} onClick={() => setSelectedTreatment(treatment)} className={`p-4 border-2 rounded-lg text-right transition ${selectedTreatment?.id === treatment.id ? 'border-amber-700 bg-amber-50' : 'border-stone-200 hover:border-amber-300'}`}>
                          <div className="font-medium text-stone-900">{treatment.name}</div>
                          <div className="text-sm text-stone-500 mt-1 flex items-center gap-1"><Clock size={14}/> {treatment.duration}</div>
                        </button>
                      ))}
                    </div>
                    <button disabled={!selectedTreatment} onClick={() => setBookingStep(2)} className="mt-8 bg-stone-900 text-white px-8 py-3 rounded-md w-full disabled:opacity-50">המשך לבחירת מועד</button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div>
                    <h3 className="text-xl font-medium mb-6">בחרי תאריך ושעה</h3>
                    <div className="flex overflow-x-auto gap-3 pb-4 mb-6" style={{ direction: 'rtl' }}>
                      {availableDates.map((date, i) => (
                        <button key={i} onClick={() => setSelectedDate(date)} className={`flex-shrink-0 w-20 h-24 rounded-lg border-2 flex flex-col items-center justify-center ${selectedDate?.toDateString() === date.toDateString() ? 'border-amber-700 bg-amber-700 text-white' : 'border-stone-200 hover:border-amber-300'}`}>
                          <span className="text-xs">{date.toLocaleDateString('he-IL', { weekday: 'short' })}</span>
                          <span className="text-2xl font-bold my-1">{date.getDate()}</span>
                          <span className="text-xs">{date.toLocaleDateString('he-IL', { month: 'short' })}</span>
                        </button>
                      ))}
                    </div>
                    {selectedDate && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                        {availableTimes.map((time) => (
                          <button key={time} onClick={() => setSelectedTime(time)} className={`py-2 rounded border font-medium ${selectedTime === time ? 'border-amber-700 bg-amber-50 text-amber-800' : 'border-stone-200 hover:border-amber-300'}`}>{time}</button>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4">
                      <button onClick={() => setBookingStep(1)} className="px-6 py-3 rounded-md text-stone-600 hover:bg-stone-100">חזור</button>
                      <button disabled={!selectedDate || !selectedTime} onClick={() => setBookingStep(3)} className="flex-1 bg-stone-900 text-white px-8 py-3 rounded-md disabled:opacity-50">המשך</button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <form onSubmit={handleBookingSubmit}>
                    <h3 className="text-xl font-medium mb-6">השלמת פרטים</h3>
                    <div className="space-y-4 mb-8">
                      <input type="text" required value={bookingName} onChange={(e) => setBookingName(e.target.value)} className="w-full border rounded-md px-4 py-3" placeholder="שם מלא" />
                      <input type="tel" required value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} className="w-full border rounded-md px-4 py-3" placeholder="050-0000000" />
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setBookingStep(2)} className="px-6 py-3 rounded-md text-stone-600 hover:bg-stone-100">חזור</button>
                      <button type="submit" className="flex-1 bg-amber-700 text-white px-8 py-3 rounded-md shadow-lg">אישור וקביעת התור</button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* חנות */}
      <section id="shop" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-amber-700 font-semibold uppercase text-sm">Shop The Clinic</span>
            <h2 className="text-3xl font-serif text-stone-900">מוצרי 20/80 - מחירון מלא</h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(category => (
              <button 
                key={category} onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category ? 'bg-amber-700 text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
              >{category}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-5 text-center border border-stone-100 hover:border-amber-200 hover:shadow-lg transition flex flex-col h-full">
                <div className="h-48 w-full mb-4 rounded-md overflow-hidden bg-stone-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-md font-bold text-stone-900 mb-1">{product.name}</h3>
                <p className="text-stone-500 text-xs mb-4 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                  <span className="text-lg font-serif text-amber-800 font-bold">₪{product.price}</span>
                  <button onClick={() => addToCart(product)} className="bg-stone-900 text-white px-3 py-2 rounded text-xs hover:bg-amber-700 flex items-center gap-2">
                    הוספה <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* פוטר עם כפתור כניסת מנהלת */}
      <footer className="bg-stone-100 py-6 border-t border-stone-200 text-center">
        <button onClick={() => setIsAdminOpen(true)} className="text-stone-400 hover:text-amber-700 text-sm flex items-center justify-center mx-auto gap-2 transition">
          <Settings size={14} /> הגדרות מנהלת (קורין)
        </button>
      </footer>

      {/* --- מודאל התחברות וסימולציית Google OAuth --- */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsAdminOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-8" dir="rtl">
            <button onClick={() => setIsAdminOpen(false)} className="absolute top-4 left-4 text-stone-400 hover:text-stone-800"><X size={20} /></button>
            
            {googleAuthStep === 0 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={24} className="text-stone-600" />
                </div>
                <h2 className="text-2xl font-serif mb-2">אזור ניהול</h2>
                <p className="text-stone-500 mb-8">התחברי לחשבון הגוגל של הקליניקה כדי לסנכרן את התורים המקומיים ליומן שלך.</p>
                
                {isCalendarSynced ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-4">
                    היומן מחובר בהצלחה ל- <b>Korinosh@gmail.com</b>
                  </div>
                ) : (
                  <button onClick={() => setGoogleAuthStep(1)} className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center gap-3 hover:bg-blue-700 transition">
                    <Mail size={18} /> התחברי עם Google
                  </button>
                )}
              </div>
            )}

            {/* שלב בחירת חשבון - סימולציה של גוגל */}
            {googleAuthStep === 1 && (
              <div className="text-center" dir="ltr">
                <div className="text-2xl font-bold text-gray-800 mb-6"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></div>
                <h3 className="text-xl text-gray-800 mb-1">Choose an account</h3>
                <p className="text-gray-500 mb-6">to continue to <b>Korin Clinic App</b></p>
                
                <button onClick={() => setGoogleAuthStep(2)} className="w-full flex items-center p-3 hover:bg-gray-50 border-b border-t border-gray-200 text-left transition">
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg mr-3">K</div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">Korin Elbaz</div>
                    <div className="text-gray-500 text-xs">Korinosh@gmail.com</div>
                  </div>
                </button>
              </div>
            )}

            {/* שלב בקשת הרשאות - סימולציה של גוגל */}
            {googleAuthStep === 2 && (
              <div className="text-center" dir="ltr">
                <div className="text-2xl font-bold text-gray-800 mb-6"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></div>
                <h3 className="text-lg text-gray-800 mb-4 px-4"><b>Korin Clinic App</b> wants to access your Google Account</h3>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">K</div>
                  <div className="text-gray-500">Korinosh@gmail.com</div>
                </div>
                <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="inline text-blue-600 mr-2" /> View and edit events on all your calendars.
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => {setGoogleAuthStep(0); setIsAdminOpen(false);}} className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded font-medium">Cancel</button>
                  <button onClick={() => {
                    setIsCalendarSynced(true);
                    setGoogleAuthStep(0);
                    setIsAdminOpen(false);
                  }} className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded font-medium">Allow</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
