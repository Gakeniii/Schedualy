
from flask import Flask, request
from flask_restful import Api, Resource
from models import  Doctor, Patient, Appointment, Specialty, PaymentOption

# @app.route('/')
# def home():
#     return ('Hello there welcome!')

class Doctor(Resource):
    def get(self, doctor_id=None):
        if doctor_id:
            doctor = Doctor.query.get_or_404(doctor_id)
            return {
                'id': doctor.id,
                'name': doctor.name,
                'email': doctor.email,
                'age': doctor.age,
                'phone_no': doctor.phone_no,
                'specialty': doctor.specialty.specialty if doctor.specialty else None
            }
        doctors = Doctor.query.all()
        return [{
            'id': doctor.id,
            'name': doctor.name,
            'email': doctor.email,
            'age': doctor.age,
            'phone_no': doctor.phone_no,
            'specialty': doctor.specialty.specialty if doctor.specialty else None
        } for doctor in doctors]

    def post(self):
        data = request.get_json()
        specialty = Specialty.query.get(data['specialty_id']) if 'specialty_id' in data else None
        doctor = Doctor(name=data['name'], email=data['email'], age=data['age'], phone_no=data['phone_no'],specialty=specialty)
        db.session.add(doctor)
        db.session.commit()
        return {'message': 'Doctor created', 'doctor': doctor.id}, 201

    def patch(self, doctor_id):
        doctor = Doctor.query.get_or_404(doctor_id)
        data = request.get_json()
        doctor.name = data.get('name', doctor.name)
        doctor.email = data.get('email', doctor.email)
        doctor.age = data.get('age', doctor.age)
        doctor.phone_no = data.get('phone_no', doctor.phone_no)
        doctor.specialty_id = data.get('specialty_id', doctor.specialty_id)
        db.session.commit()
        return {'message': 'Doctor updated', 'doctor': doctor.id}

    def delete(self, doctor_id):
        doctor = Doctor.query.get_or_404(doctor_id)
        db.session.delete(doctor)
        db.session.commit()
        return {'message': 'Doctor deleted'}

class Patient(Resource):
    def get(self, patient_id=None):
        if patient_id:
            patient = Patient.query.get_or_404(patient_id)
            return {
                'id': patient.id,
                'name': patient.name,
                'phone_no': patient.phone_no,
                'age': patient.age
            }
        patients = Patient.query.all()
        return [{
            'id': patient.id,
            'name': patient.name,
            'phone_no': patient.phone_no,
            'age': patient.age
        } for patient in patients]

    def post(self):
        data = request.get_json()
        patient = Patient(
            name=data['name'],
            phone_no=data['phone_no'],
            age=data['age']
        )
        db.session.add(patient)
        db.session.commit()
        return {'message': 'Patient created', 'patient': patient.id}, 201

    def patch(self, patient_id):
        patient = Patient.query.get_or_404(patient_id)
        data = request.get_json()
        patient.name = data.get('name', patient.name)
        patient.phone_no = data.get('phone_no', patient.phone_no)
        patient.age = data.get('age', patient.age)
        db.session.commit()
        return {'message': 'Patient updated', 'patient': patient.id}

    def delete(self, patient_id):
        patient = Patient.query.get_or_404(patient_id)
        db.session.delete(patient)
        db.session.commit()
        return {'message': 'Patient deleted'}

class Appointment(Resource):
    def get(self, appointment_id=None):
        if appointment_id:
            appointment = Appointment.query.get_or_404(appointment_id)
            return {
                'id': appointment.id,
                'date': appointment.date,
                'time': appointment.time,
                'status': appointment.status,
                'treatment_plan': appointment.treatment_plan,
                'notes': appointment.notes,
                'diagnosis': appointment.diagnosis,
                'patient_id': appointment.patient_id,
                'doctor_id': appointment.doctor_id
            }
        appointments = Appointment.query.all()
        return [{
            'id': appointment.id,
            'date': appointment.date,
            'time': appointment.time,
            'status': appointment.status,
            'patient_id': appointment.patient_id,
            'doctor_id': appointment.doctor_id
        } for appointment in appointments]

    def post(self):
        data = request.get_json()
        appointment = Appointment(
            date=data['date'],
            time=data['time'],
            status=data.get('status', 'Scheduled'),
            treatment_plan=data.get('treatment_plan'),
            notes=data.get('notes'),
            diagnosis=data.get('diagnosis'),
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id']
        )
        db.session.add(appointment)
        db.session.commit()
        return {'message': 'Appointment created', 'appointment': appointment.id}, 201

    def patch(self, appointment_id):
        appointment = Appointment.query.get_or_404(appointment_id)
        data = request.get_json()
        appointment.date = data.get('date', appointment.date)
        appointment.time = data.get('time', appointment.time)
        appointment.status = data.get('status', appointment.status)
        appointment.treatment_plan = data.get('treatment_plan', appointment.treatment_plan)
        appointment.notes = data.get('notes', appointment.notes)
        appointment.diagnosis = data.get('diagnosis', appointment.diagnosis)
        db.session.commit()
        return {'message': 'Appointment updated', 'appointment': appointment.id}

    def delete(self, appointment_id):
        appointment = Appointment.query.get_or_404(appointment_id)
        db.session.delete(appointment)
        db.session.commit()
        return {'message': 'Appointment deleted'}

class Specialty(Resource):
    def get(self, specialty_id=None):
        if specialty_id:
            specialty = Specialty.query.get_or_404(specialty_id)
            return {'id': specialty.id, 'specialty': specialty.specialty}
        specialties = Specialty.query.all()
        return [{'id': specialty.id, 'specialty': specialty.specialty} for specialty in specialties]

    def post(self):
        data = request.get_json()
        specialty = Specialty(specialty=data['specialty'])
        db.session.add(specialty)
        db.session.commit()
        return {'message': 'Specialty created', 'specialty': specialty.id}, 201

    def patch(self, specialty_id):
        specialty = Specialty.query.get_or_404(specialty_id)
        data = request.get_json()
        specialty.specialty = data.get('specialty', specialty.specialty)
        db.session.commit()
        return {'message': 'Specialty updated', 'specialty': specialty.id}

    def delete(self, specialty_id):
        specialty = Specialty.query.get_or_404(specialty_id)
        db.session.delete(specialty)
        db.session.commit()
        return {'message': 'Specialty deleted'}

class PaymentOption(Resource):
    def get(self, payment_option_id=None):
        if payment_option_id:
            payment_option = PaymentOption.query.get_or_404(payment_option_id)
            return {
                'id': payment_option.id,
                'credit_card': payment_option.credit_card,
                'debit_card': payment_option.debit_card,
                'insurance': payment_option.insurance,
                'angel_donation': payment_option.angel_donation,
                'patient_id': payment_option.patient_id
            }
        payment_options = PaymentOption.query.all()
        return [{
            'id': payment_option.id,
            'credit_card': payment_option.credit_card,
            'debit_card': payment_option.debit_card,
            'insurance': payment_option.insurance,
            'angel_donation': payment_option.angel_donation,
            'patient_id': payment_option.patient_id
        } for payment_option in payment_options]

    def post(self):
        data = request.get_json()
        payment_option = PaymentOption(
            credit_card=data.get('credit_card'),
            debit_card=data.get('debit_card'),
            insurance=data.get('insurance'),
            angel_donation=data.get('angel_donation'),
            patient_id=data['patient_id']
        )
        db.session.add(payment_option)
        db.session.commit()
        return {'message': 'Payment option created', 'payment_option': payment_option.id}, 201

    def patch(self, payment_option_id):
        payment_option = PaymentOption.query.get_or_404(payment_option_id)
        data = request.get_json()
        payment_option.credit_card = data.get('credit_card', payment_option.credit_card)
        payment_option.debit_card = data.get('debit_card', payment_option.debit_card)
        payment_option.insurance = data.get('insurance', payment_option.insurance)
        payment_option.angel_donation = data.get('angel_donation', payment_option.angel_donation)
        db.session.commit()
        return {'message': 'Payment option updated', 'payment_option': payment_option.id}

    def delete(self, payment_option_id):
        payment_option = PaymentOption.query.get_or_404(payment_option_id)
        db.session.delete(payment_option)
        db.session.commit()
        return {'message': 'Payment option deleted'}

# Add routes to the API
api.add_resource(Doctor, '/doctors', '/doctors/<int:doctor_id>')
api.add_resource(Patient, '/patients', '/patients/<int:patient_id>')
api.add_resource(Appointment, '/appointments', '/appointments/<int:appointment_id>')
api.add_resource(Specialty, '/specialties', '/specialties/<int:specialty_id>')
api.add_resource(PaymentOption, '/payment-options', '/payment-options/<int:payment_option_id>')



# @login_manager.user_loader
# def load_user(user_id):
#     return Administrator.query.get(int(user_id))

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         email = request.form['email']
#         password = request.form['password']
        
#         admin = Administrator.query.filter_by(email=email).first()
        
#         if admin and admin.check_password(password):
#             login_user(admin)
#             return redirect(url_for('home'))  # Redirect to dashboard or home page
#         else:
#             return 'Invalid email or password'

#     return render_template('login.html')

# @app.route('/logout')
# def logout():
#     logout_user()
#     return redirect(url_for('login'))  # Redirect to login page after logout




if __name__ == '__main__':
    db.create_all()
    app.run(port=5555, debug=True)