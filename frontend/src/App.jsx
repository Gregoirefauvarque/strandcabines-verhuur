import React, { useState } from 'react';

function BookingForm({ cabin, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    period: 'day',
    startDate: ''
  });
  const [idCard, setIdCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.period === 'day' && !idCard) {
        alert('Voor dagverhuur is een foto van uw identiteitskaart verplicht.');
        return;
      }

      // Simuleer API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowConfirmation(true);
      
      setTimeout(() => {
        setShowConfirmation(false);
        onClose();
      }, 3000);
    } catch (error) {
      alert('Er ging iets mis. Probeer het opnieuw.');
    }

    setIsSubmitting(false);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Bedankt voor uw reservering!</h2>
          <p className="text-gray-600">U ontvangt binnen enkele minuten een bevestigingsmail.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Reserveer {cabin.name}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Naam</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Telefoon</label>
            <input
              type="tel"
              required
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Periode</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.period}
              onChange={(e) => setFormData({...formData, period: e.target.value})}
            >
              <option value="day">Per dag (€{cabin.prices.day})</option>
              <option value="twoWeeks">2 weken (€{cabin.prices.twoWeeks})</option>
              <option value="month">Per maand (vanaf €{cabin.prices.months.april})</option>
              <option value="season">Heel seizoen (€{cabin.prices.season})</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Start datum</label>
            <input
              type="date"
              required
              className="w-full p-2 border rounded"
              min="2025-04-01"
              max="2025-09-30"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>

          {formData.period === 'day' && (
            <div>
              <label className="block mb-1 font-medium">
                Identiteitskaart foto (verplicht voor dagverhuur)
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={(e) => setIdCard(e.target.files[0])}
              />
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-2 px-4 rounded font-medium ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Bezig met reserveren...' : 'Reserveer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 font-medium"
            >
              Annuleer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedCabin, setSelectedCabin] = useState(null);

  const cabins = [
    {
      id: 1,
      name: "Strandcabine 1",
      inventory: [
        "1 Tafel",
        "2 Stoelen", 
        "2 Strandstoelen",
        "1 Gordijn",
        "Strandspeelgoed",
        "1 Borsteltje"
      ],
      prices: {
        day: 50,
        twoWeeks: 200,
        months: {
          april: 350,
          may: 400,
          june: 500,
          july: 500,
          august: 500,
          september: 350
        },
        season: 1800
      }
    },
    {
      id: 2,
      name: "Strandcabine 2",
      inventory: [
        "1 Tafel",
        "2 Stoelen",
        "2 Strandstoelen",
        "1 Gordijn",
        "Strandspeelgoed",
        "1 Borsteltje"
      ],
      prices: {
        day: 50,
        twoWeeks: 200,
        months: {
          april: 350,
          may: 400,
          june: 500,
          july: 500,
          august: 500,
          september: 350
        },
        season: 1800
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Strandcabines Blankenberge
          </h1>
          <p className="text-blue-700">Verhuur seizoen 2025 - April tot September</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8">
          {cabins.map(cabin => (
            <div key={cabin.id} className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold mb-6 text-blue-900">{cabin.name}</h2>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-blue-800">Faciliteiten:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {cabin.inventory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-blue-800">Prijzen:</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Per dag: €{cabin.prices.day} (ID kaart vereist)</p>
                  <p>Per 2 weken: €{cabin.prices.twoWeeks}</p>
                  <div className="mt-4">
                    <p className="font-medium">Per maand:</p>
                    <ul className="ml-4 mt-2 space-y-1">
                      <li>April: €{cabin.prices.months.april}</li>
                      <li>Mei: €{cabin.prices.months.may}</li>
                      <li>Juni-Augustus: €{cabin.prices.months.june}</li>
                      <li>September: €{cabin.prices.months.september}</li>
                    </ul>
                  </div>
                  <p className="mt-4 font-medium">
                    Heel seizoen: €{cabin.prices.season}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCabin(cabin)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Reserveer Nu
