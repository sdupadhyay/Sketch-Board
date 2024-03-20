export default function CheckPage({ params, searchParams }) {
	return (
		<>
			<meta name="robots" content="index,follow" />

			<p>
				Dr Aman Priya Khanna is a well-known General Surgeon, Proctologist and
				Bariatric Surgeon currently associated with
				<span id="dots">...</span>
				<br />
				<br />
				<span id="content" style={{ display: "none" }}>
					HealthFort Clinic, Health First Multispecialty Clinic in Delhi. He has
					12 years of experience in General Surgery and worked as an expert
					General Surgeon in different cities in India. He has worked in many
					reputed hospitals like HealthFort Clinic and Artemis Hospital,
					Gurugram. Doctor Aman Priya Khanna has contributed to handling more
					than 4000 complex medical cases in several hospitals. He is known for
					his attention to accurate diagnosis and for treating patients with
					empathy. The speciality interests of Dr Aman are Laparoscopic, Laser,
					Bariatric Surgery, Laparoscopic Hernia, Advanced and Laser Proctology,
					Incisional Hernia, Cholecystectomy, Colorectal Surgery, Keyhole
					Surgery and Reflux Surgery. He is an active member of the Association
					of Surgeons of India (ASI).
				</span>
			</p>

			<button id="buttonReadMore">Click to Read More About the Blog</button>
		</>
	);
}
