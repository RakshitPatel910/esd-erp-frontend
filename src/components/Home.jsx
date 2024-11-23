import { useState, useEffect } from 'react'
import axios from 'axios'
import './home.css'

function Home() {
  const [organisationId, setOrganisationId] = useState('');
  const [profile, setProfile] = useState('');
  const [description, setDescription] = useState('');
  const [minGrade, setMinGrade] = useState('');
  const [intake, setIntake] = useState('');
  const [domainIds, setDomainIds] = useState([]);
  const [specialisationIds, setSpecialisationIds] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [domains, setDomains] = useState([]);
  const [specialisations, setSpecialisations] = useState([]);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/organisation'); // Replace with your endpoint
        setOrganisations(response.data);
      } catch (error) {
        console.error('Error fetching organisations:', error);
      }
    };

    const fetchDomains = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/domain'); // Replace with your endpoint
        setDomains(response.data);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };

    const fetchSpecialisations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/specialisation'); // Replace with your endpoint
        setSpecialisations(response.data);
      } catch (error) {
        console.error('Error fetching specialisations:', error);
      }
    };

    // Fetch all data
    fetchOrganisations();
    fetchDomains();
    fetchSpecialisations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      organisation_id: organisationId,
      profile,
      description,
      min_grade: parseFloat(minGrade),
      intake: parseInt(intake, 10),
      domain_ids: domainIds.map(Number),
      specialisation_id: specialisationIds.map(Number),
    };

    console.log(payload);

    try{
      const response = axios.post('http://localhost:8080/placement', payload);

      console.log("placement offer added successfully!!");
    }
    catch (error) {
      console.error(error);
    }

    // fetch('/api/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('Response:', data);
    //     alert('Data submitted successfully!');
    //   })
    //   .catch((err) => console.error('Error:', err));
  };


  const handleDomainChange = (e) => {
    const selectedDomains = Array.from(e.target.selectedOptions, (option) => option.value);
    setDomainIds(selectedDomains);

    console.log(selectedDomains);
  };

  const handleSpecialisationChange = (e) => {
    const selectedSpecialisations = Array.from(e.target.selectedOptions, (option) => option.value);
    setSpecialisationIds(selectedSpecialisations);
  };

  return (
    <div className="container">
      <h1>Job Placement Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Organisation Dropdown */}
        <label>
          Organisation:
          <select value={organisationId} onChange={(e) => setOrganisationId(e.target.value)} required>
            <option value="">Select Organisation</option>
            {organisations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </label>

        {/* Profile Input */}
        <label>
          Profile:
          <input
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="Enter profile"
            required
          />
        </label>

        {/* Description Input */}
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </label>

        {/* Min Grade Input */}
        <label>
          Minimum Grade:
          <input
            type="number"
            step="0.01"
            value={minGrade}
            onChange={(e) => setMinGrade(e.target.value)}
            placeholder="Enter minimum grade"
            required
          />
        </label>

        {/* Intake Input */}
        <label>
          Intake:
          <input
            type="number"
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
            placeholder="Enter intake"
            required
          />
        </label>

        {/* Domain Dropdown (Multiple Select) */}
        <label>
          Domains:
          <select
            multiple
            value={domainIds}
            onChange={handleDomainChange} // Handle multiple selections
            required
          >
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.name}
              </option>
            ))}
          </select>
        </label>

        {/* Specialisation Dropdown (Multiple Select) */}
        <label>
          Specialisations:
          <select
            multiple
            value={specialisationIds}
            onChange={handleSpecialisationChange} // Handle multiple selections
            required
          >
            {specialisations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home
