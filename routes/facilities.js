const express = require('express');
const router = express.Router();

// Hardcoded facilities data (same as in main.html)
const facilities = [
  { name: "Eco Globe E-Waste Recyclers", lat: 12.8275, lng: 77.4498, address: "Bidadi Industrial Area, Bengaluru 562109" },
  { name: "Eco-Ewaste Recyclers India Pvt Ltd", lat: 12.9505, lng: 77.5440, address: "Mysore Road, Bengaluru 560039" },
  { name: "Trishyirya Recycling India Pvt. Ltd.", lat: 13.0150, lng: 77.4900, address: "Peenya Industrial Estate, Bengaluru 560058" },
  { name: "Samarthanam Trust for the Disabled (Peenya)", lat: 13.0140, lng: 77.4895, address: "Peenya Industrial Area, Bengaluru 560058" },
  { name: "E-Ward & Co.", lat: 12.9250, lng: 77.6240, address: "Bommanahalli, Bengaluru 560068" },
  { name: "Ramky E-Waste Recycling Facility", lat: 17.4474, lng: 78.5751, address: "IDA Mallapur, Hyderabad 500076" },
  { name: "Green India Recycling", lat: 17.4790, lng: 78.6046, address: "IDA Cherlapally Phase 2, Hyderabad 500051" },
  { name: "E-Parisaraa Pvt Ltd (Chennai Unit)", lat: 13.1130, lng: 80.2580, address: "Vyasarpadi Industrial Estate, Chennai 600039" },
  { name: "TES-AMM India", lat: 12.9670, lng: 80.2450, address: "Old Mahabalipuram Road, Chennai 600096" },
  { name: "EcoCentric Management Pvt Ltd", lat: 19.1024, lng: 72.8826, address: "Saki Naka, Andheri East, Mumbai 400072" },
  { name: "Ecoreco (Eco Recycling Ltd)", lat: 19.1123, lng: 72.8697, address: "Andheri-Kurla Road, Mumbai 400059" },
  { name: "Cerebra Integrated Technologies", lat: 28.4950, lng: 77.5250, address: "Ecotech III, Greater Noida, Delhi NCR 201306" },
  { name: "Karo Sambhav Collection Center", lat: 28.5505, lng: 77.2684, address: "Okhla Industrial Estate, New Delhi 110020" },
  { name: "SWaCH E-Waste Collection Center", lat: 18.5603, lng: 73.8077, address: "Aundh, Pune 411007" },
  { name: "Cummins India Recycling Unit", lat: 18.5074, lng: 73.8077, address: "Kothrud Industrial Area, Pune 411038" },
  { name: "Hulladek Recycling Pvt Ltd", lat: 22.5090, lng: 88.3520, address: "Shyama Prasad Mukherjee Road, Kolkata 700026" },
  { name: "Greenwaves Environmental Solutions", lat: 22.4713, lng: 88.1803, address: "Budge Budge Trunk Road, Kolkata 700137" }
];

// Get all facilities
router.get('/', async (req, res) => {
  try {
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get nearest facilities
router.get('/nearest', async (req, res) => {
  try {
    const { lat, lng, limit = 5 } = req.query;
    
    const facilitiesWithDistance = facilities.map(f => {
      const distance = Math.sqrt(
        Math.pow(f.lat - parseFloat(lat), 2) + 
        Math.pow(f.lng - parseFloat(lng), 2)
      );
      return { ...f, distance };
    });

    facilitiesWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.json(facilitiesWithDistance.slice(0, parseInt(limit)));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
