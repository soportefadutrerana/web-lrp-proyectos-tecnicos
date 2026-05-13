import { teamMemberService } from '@/lib/team-member.service'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const members = await teamMemberService.listPublic()
    return NextResponse.json({ success: true, data: members }, { status: 200 })
  } catch (error) {
    console.error('Error al obtener equipo técnico:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
