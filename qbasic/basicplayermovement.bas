'vertex rotation test
SCREEN 7

'wall
vx1 = 70
vy1 = 10

vx2 = 70
vy2 = 90

'player
px = 50
py = 50
angle = 0

DO
    'draw the absolute map
    VIEW (4, 40)-(103, 149), 0, 15

    LINE (vx1, vy1)-(vx2, vy2), 15
    LINE (px, py)-(COS(angle) * 5 + px, SIN(angle) * 5 + py), 7

    PSET (px, py), 15

    'wait for screen refresh and swap page
    SCREEN , , page%, 1 - page%
    page% = 1 - page%

    WAIT &H3DA, &H8, &H8
    WAIT &H3DA, &H8

    SELECT CASE INKEY$
        CASE CHR$(0) + "H":
            px = px + COS(angle)
            py = py + SIN(angle)
        CASE CHR$(0) + "P":
            px = px - COS(angle)
            py = py - SIN(angle)
        CASE CHR$(0) + "K":
            angle = angle - 0.1
        CASE CHR$(0) + "M":
            angle = angle + 0.1
        CASE "a", "A":
            px = px + SIN(angle)
            py = py - COS(angle)
        CASE "d", "D":
            px = px - SIN(angle)
            py = py + COS(angle)
        CASE "q", "Q", CHR$(27):
            EXIT DO
    END SELECT
LOOP