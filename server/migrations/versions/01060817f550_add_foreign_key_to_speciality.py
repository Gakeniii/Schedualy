"""Add foreign key to speciality

Revision ID: 01060817f550
Revises: 39796319188a
Create Date: 2025-01-28 17:43:27.113421

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01060817f550'
down_revision = '39796319188a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointment', schema=None) as batch_op:
        batch_op.alter_column('prev_appointment',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=True)

    with op.batch_alter_table('specialty', schema=None) as batch_op:
        batch_op.add_column(sa.Column('doctor_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_doctor_id', 'doctor', ['doctor_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('specialty', schema=None) as batch_op:
        batch_op.drop_constraint('fk_doctor_id')
        batch_op.drop_column('doctor_id')

    with op.batch_alter_table('appointment', schema=None) as batch_op:
        batch_op.alter_column('prev_appointment',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=True)

    # ### end Alembic commands ###
