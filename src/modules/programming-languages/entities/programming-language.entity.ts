import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProgrammingLanguage {
    @ApiProperty({ 
        example: 'd1f2e3a4-b5c6-7d8e-9f0g-1h2i3j4k5l6m', 
        description: 'Unique identifier for the programming language',
        required: true,
        type: String
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: "Python",
        description: "Name of the programming language",
        required: true,
        type: String,
    })
    @Column({ unique: true })
    @IsString()
    name: string;

    @ApiProperty({
        example: "John Doe",
        description: "Name of the person who created this entry",
        required: false,
        type: String,
    })
    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    createdBy?: string;

    @ApiProperty({
        example: "A high-level programming language designed for readability and simplicity.",
        description: "Description of the programming language",
        required: false,
        type: String,
    })
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        example: "https://example.com/logo.png",
        description: "URL of the programming language logo",
        required: false,
        type: String,
    })
    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    logoUrl?: string;

    @ApiProperty({
        example: ["Multi-paradigm", "Object-oriented", "Functional", "Imperative"],
        description: "Paradigms of the programming language",
        required: false,
        type: [String],
    })
    @Column('text', { array: true, nullable: true })
    paradigms?: string[];

    @ApiProperty({
        example: ["Web Development", "Data Science", "Machine Learning"],
        description: "Use cases of the programming language",
        required: false,
        type: [String],
    })
    @Column('text', { array: true, nullable: true })
    useCases?: string[];

    @ApiProperty({
        example: true,
        description: "Indicates if the programming language is active",
        required: true,
        type: Boolean,
    })
    @Column()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        example: "2023-10-01T12:00:00Z",
        description: "Timestamp when the programming language was created",
        required: true,
        type: String,
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({
        example: "2023-10-01T12:00:00Z",
        description: "Timestamp when the programming language was last updated",
        required: true,
        type: String,
    })
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
