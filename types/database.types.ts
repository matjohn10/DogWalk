export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      coordinates: {
        Row: {
          index: number
          latitude: number
          longitude: number
          path_id: string
        }
        Insert: {
          index: number
          latitude: number
          longitude: number
          path_id: string
        }
        Update: {
          index?: number
          latitude?: number
          longitude?: number
          path_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coordinates_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "paths"
            referencedColumns: ["id"]
          },
        ]
      }
      dogs: {
        Row: {
          alone: boolean
          breed: string
          created_at: string
          id: string
          path_id: string
          personality: string
          size: string
          walk_time: string
        }
        Insert: {
          alone: boolean
          breed: string
          created_at?: string
          id?: string
          path_id: string
          personality: string
          size: string
          walk_time: string
        }
        Update: {
          alone?: boolean
          breed?: string
          created_at?: string
          id?: string
          path_id?: string
          personality?: string
          size?: string
          walk_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "dogs_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "paths"
            referencedColumns: ["id"]
          },
        ]
      }
      paths: {
        Row: {
          avg_latitude: number
          avg_longitude: number
          created_at: string | null
          id: string
          walker_id: string
        }
        Insert: {
          avg_latitude: number
          avg_longitude: number
          created_at?: string | null
          id: string
          walker_id: string
        }
        Update: {
          avg_latitude?: number
          avg_longitude?: number
          created_at?: string | null
          id?: string
          walker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paths_walker_id_fkey"
            columns: ["walker_id"]
            isOneToOne: false
            referencedRelation: "walkers"
            referencedColumns: ["id"]
          },
        ]
      }
      walkers: {
        Row: {
          id: string
          unit_system: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          unit_system?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          unit_system?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "walkers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
